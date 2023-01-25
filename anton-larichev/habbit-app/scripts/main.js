'use strict';

let habits = [];
const HABIT_KEY = 'HABIT_KEY';
let currentActiveHabbitId;

/* description page */
const page = {
  menu: document.querySelector('.habit-list'),
  addBtn: document.querySelector('.habit-list__btn--add'),
  header: {
    titleHabit: document.querySelector('.habit-title'),
    progressBar: document.querySelector('.habit-progress__bar--cover'),
    progressPersent: document.querySelector('.habit-progress__percent'),
  },
  content: {
    dayList: document.querySelector('.day-list'),
    newDay: document.querySelector('.day__number'),
    form: document.querySelector('.day__form'),
  },
  popup: {
    cover: document.querySelector('.cover'),
    close: document.querySelector('.popup__close'),
    icons: document.querySelectorAll('.popup__icon-btn'),
    form: document.querySelector('.popup__form'),
  },
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
  const percent = ((activeHabit.days.length / activeHabit.target) * 100).toFixed(0);
  return percent > 100 ? 100 : percent;
}

// показывает/скрывает попап
function togglePopup() {
  page.popup.cover.classList.toggle('cover--hidden');
}

// очищает поля формы
function resetForm(form, fields) {
  for (const field of fields) {
    form[field].value = '';
  }
}

// проверяет поля формы и возращает объект с данными формы
function validateForm(form, fields) {
  const dataForm = new FormData(form);
  const result = {};
  let isValidForm = true;
  for (const field of fields) {
    form[field].classList.remove('error');
    const fieldValue = dataForm.get(field);
    if (!fieldValue) {
      form[field].classList.add('error');
    }
    result[field] = fieldValue;
  }
  for (const field of fields) {
    if (!result[field]) {
      isValidForm = false;
    }
  }
  return isValidForm ? result : null;
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
    dayHabitItem.innerHTML = `<p class="day__number">День ${
      Number(index) + 1
    }</p>
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
  document.location.replace(document.location.pathname + '#' + activeHabitId);
  rerenderMenu(activeHabit);
  rerenderHeader(activeHabit);
  rerenderContent(activeHabit);
}

/* work with habit */
page.addBtn.addEventListener('click', () => {
  togglePopup();
});

page.popup.close.addEventListener('click', () => {
  togglePopup();
});

// выбирает иконку для новой привычки
page.popup.icons.forEach((element) => {
  element.addEventListener('click', () => {
    page.popup.icons.forEach((item) => {
      item.classList.remove('popup__icon-btn--active');
    });
    element.classList.add('popup__icon-btn--active');
    page.popup.form['icon'].value = element.name;
  });
});

// добавляет новую привычку
page.popup.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = validateForm(page.popup.form, ['name', 'icon', 'target']);
  if (data) {
    const maxHabitId = habits.reduce((acc, habbit) => acc > habbit.id ? acc : habbit.id, 1);
    habits.push({
      id: maxHabitId + 1,
      icon: data.icon,
      name: data.name,
      target: data.target,
      days: [],
    });
    rerender(maxHabitId + 1);
    togglePopup();
    resetForm(page.popup.form, ['name', 'target']);
    saveData();
  }
});

/* work with days */
// добавляет день
page.content.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = validateForm(page.content.form, ['comment']);
  if (data) {
    habits = habits.map((habit) => {
      if (habit.id === currentActiveHabbitId) {
        return {
          ...habit,
          days: habit.days.concat([{ comment: data.comment }]),
        };
      }
      return habit;
    });
    resetForm(page.content.form, ['comment']);
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
        days: element.days,
      };
    }
    return element;
  });
  rerender(currentActiveHabbitId);
  saveData();
}

/* initialization */
(() => {
  loadData();
  const habitId = Number(document.location.hash.replace('#', ''));
  const currentHabit = habits.find(habit => habit.id === habitId);
  if (currentHabit) {
    rerender(habitId);
  } else {
    rerender(habits.at(-1).id);
  }
})();
