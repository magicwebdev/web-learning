'use strict';

let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY';

/* description page */
const page = {
  menu: document.querySelector('.habbit-list'),
  header: {
    titleHabbit: document.querySelector('.habbit-title'),
    progressBar: document.querySelector('.habbit-progress__bar--cover'),
    progressPersent: document.querySelector('.habbit-progress__percent')
  },
  content: {

  }
};

/* utils */
// загружает данные из LocalStorage
function loadData() {
  const habbitsString = localStorage.getItem(HABBIT_KEY);
  const habbitArray = JSON.parse(habbitsString);
  if (Array.isArray(habbitArray)) {
    habbits = habbitArray;
  }
}
// сохраняет данные в LocalStorag
function saveData() {
  localStorage.setItem(HABBIT_KEY, habbits);
}

// считает процент выполнения привычки
function calculatePercent(activeHabbit) {
  const percent = (activeHabbit.days.length / activeHabbit.target * 100).toFixed(0);
  return percent > 100 ? 100 : percent;
}

/* render */
function rerenderMenu(activeHabbit) {

}

function rerenderHeader(activeHabbit) {
  page.header.titleHabbit.innerText = activeHabbit.name;
  const percentHabbit = calculatePercent(activeHabbit);
  page.header.progressPersent.innerText = `${percentHabbit}%`;
  page.header.progressBar.setAttribute('style', `width:${percentHabbit}%`);
}

function rerenderContent(activeHabbit) {
  for (const habbit of habbits) {
    // const existedHabbit
  }
}

function rerender(activeHabbitId) {
  const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
  if (!activeHabbit) {
    return;
  }
  rerenderMenu(activeHabbit);
  rerenderHeader(activeHabbit);
  rerenderContent(activeHabbit);
}

/* initialization */
(() => {
  loadData();
  rerender(habbits[0].id);
})();
