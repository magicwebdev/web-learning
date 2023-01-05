'use strict';

let habits = [];
const HABIT_KEY = 'HABIT_KEY';

/* description page */
const page = {
  menu: document.querySelector('.habit-list'),
  header: {
    titlehabit: document.querySelector('.habit-title'),
    progressBar: document.querySelector('.habit-progress__bar--cover'),
    progressPersent: document.querySelector('.habit-progress__percent'),
  },
  content: {
    dayList: document.querySelector('.day-list'),
    newDay: document.querySelector('.day__number')
  }
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
  localStorage.setItem(HABIT_KEY, habits);
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
      // добавление привычки в меню
      const habitMenuItem = document.createElement('li');
      habitMenuItem.classList.add('habit-list__item');
      habitMenuItem.setAttribute('habit-id', habit.id);
      habitMenuItem.innerHTML = `<button class="habit-list__btn">
      <img src="images/${habit.icon}.svg" alt="Привычка" class="habit-list__img">
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
  page.header.titlehabit.innerText = activeHabit.name;
  const percenthabit = calculatePercent(activeHabit);
  page.header.progressPersent.innerText = `${percenthabit}%`;
  page.header.progressBar.setAttribute('style', `width:${percenthabit}%`);
}

function rerenderContent(activeHabit) {
  page.content.dayList.innerHTML = '';
  for (const index in activeHabit.days) {
    const dayHabitItem = document.createElement('li');
    dayHabitItem.classList.add('day');
    dayHabitItem.innerHTML = `<p class="day__number">День ${Number(index) + 1}</p>
    <p class="day__comment">${activeHabit.days[index].comment}</p>
    <button class="day__del"></button>`;
    page.content.dayList.appendChild(dayHabitItem);
  }
  page.content.newDay.innerText = `День ${activeHabit.days.length + 1}`;
}

function rerender(activeHabitId) {
  const activeHabit = habits.find((habit) => habit.id === activeHabitId);
  if (!activeHabit) {
    return;
  }
  rerenderMenu(activeHabit);
  rerenderHeader(activeHabit);
  rerenderContent(activeHabit);
}

/* initialization */
(() => {
  loadData();
  rerender(habits.at(-1).id);
})();
