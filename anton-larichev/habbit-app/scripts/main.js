'use strict';

let habits = [];
const HABIT_KEY = 'HABIT_KEY';
let currentActiveHabbitId;

/* description page */
const page = {
  menu: document.querySelector('.habit-list'),
  header: {
    titleHabit: document.querySelector('.habit-title'),
    progressBar: document.querySelector('.habit-progress__bar--cover'),
    progressPersent: document.querySelector('.habit-progress__percent'),
  },
  content: {
    dayList: document.querySelector('.day-list'),
    newDay: document.querySelector('.day__number')
  },
  form: document.querySelector('.day-form'),
  // form: {
  //   input: document.querySelector('.day-form__input'),
  //   button: document.querySelector('.day-form__btn')
  // }
};

/* utils */
// загружает данные из LocalStorage
function loadData() {
  const habitsString = localStorage.getItem(HABIT_KEY);
  const habitsArray = JSON.parse(habitsString);
  if (Array.isArray(habitsArray)) {
    habits = habitsArray;
  }
}
// сохраняет данные в LocalStorag
function saveData() {
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
}

// считает процент выполнения привычки
function calculatePercent(activeHabit) {
  const percent = (
    (activeHabit.days.length / activeHabit.target) *
    100
  ).toFixed(0);
  return percent > 100 ? 100 : percent;
}

/* render */
function rerenderMenu(activeHabit) {
  for (const habit of habits) {
    const habitInMenu = document.querySelector(`[habit-id="${habit.id}"]`);
    if (!habitInMenu) {
      // добавляет привычку в меню
      const habitMenuItem = document.createElement('li');
      habitMenuItem.classList.add('habit-list__item');
      habitMenuItem.setAttribute('habit-id', habit.id);
      habitMenuItem.innerHTML = `<button class="habit-list__btn" title="${habit.name}">
      <img src="images/${habit.icon}.svg" alt="${habit.name}" class="habit-list__img">
      </button>`;
      habitMenuItem.addEventListener('click', () => rerender(habit.id));
      if (habit.id === activeHabit.id) {
        habitMenuItem.classList.add('habit-list__item--active');
      }
      page.menu.prepend(habitMenuItem);
      continue;
    }
    if (habit.id === activeHabit.id) {
      habitInMenu.classList.add('habit-list__item--active');
    } else {
      habitInMenu.classList.remove('habit-list__item--active');
    }
  }
}

function rerenderHeader(activeHabit) {
  page.header.titleHabit.innerText = activeHabit.name;
  const percentHabit = calculatePercent(activeHabit);
  page.header.progressPersent.innerText = `${percentHabit}%`;
  page.header.progressBar.setAttribute('style', `width:${percentHabit}%`);
}

function rerenderContent(activeHabit) {
  page.content.dayList.innerHTML = '';
  for (const index in activeHabit.days) {
    const dayHabitItem = document.createElement('li');
    dayHabitItem.classList.add('day');
    dayHabitItem.innerHTML = `<p class="day__number">День ${Number(index) + 1}</p>
    <p class="day__comment">${activeHabit.days[index].comment}</p>
    <button type="button" class="day__del" onclick="deleteDay(${index})"></button>`;
    page.content.dayList.appendChild(dayHabitItem);
  }
  page.content.newDay.innerText = `День ${activeHabit.days.length + 1}`;
}

function rerender(activeHabitId) {
  currentActiveHabbitId = activeHabitId;
  const activeHabit = habits.find((element) => element.id === activeHabitId);
  if (!activeHabit) {
    return;
  }
  rerenderMenu(activeHabit);
  rerenderHeader(activeHabit);
  rerenderContent(activeHabit);
}

/* work with days */
// мой первоначальный вариант
// page.form.button.addEventListener('click', (e) => {
//   e.preventDefault();
//   const habitId = +document.querySelector('.habit-list__item--active').getAttribute('habit-id');
//   const habit = habits.find((element) => element.id === habitId);
//   if (page.form.input.value) {
//     habit.days.push({ comment: page.form.input.value });
//     page.form.input.value = '';
//   }
//   rerender(habitId);
//   saveData();
// });

// добавляет день
page.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(page.form);
  const comment = data.get('comment');
  if (!comment) {
    page.form['comment'].classList.add('error');
  } else {
    habits = habits.map((element) => {
      if (element.id === currentActiveHabbitId) {
        return {
          ...element,
          days: element.days.concat([{ comment }])
        }
      }
      return element;
    });
    page.form['comment'].classList.remove('error');
    page.form['comment'].value = '';
    rerender(currentActiveHabbitId);
    saveData();
  }
});

// удаляет день
function deleteDay(index) {
  habits = habits.map((element) => {
    if (element.id === currentActiveHabbitId) {
      element.days.splice(index, 1);
      return {
        ...element,
        days: element.days
      }
    }
    return element;
  });
  rerender(currentActiveHabbitId);
  saveData();
};

/* initialization */
(() => {
  loadData();
  rerender(habits.at(-1).id);
})();
