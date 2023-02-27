window.addEventListener('load', function () {
  const menu = document.querySelector('.menu');
  const menuLinks = menu.querySelectorAll('.menu__link');
  const content = document.querySelector('.content');

  // кнопка наверх
  const btnUp = {
    el: document.querySelector('.up'),
    show() {
      this.el.classList.add('active');
    },
    hide() {
      this.el.classList.remove('active');
    }
  }

  // реализация техники debounce
  let scrollDelay = 100;
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(scrollPage, scrollDelay);
  });

  // появление кнопки наверх при скролле страницы и определение активного пункта меню
  function scrollPage() {
    window.scrollY > window.innerHeight ? btnUp.show() : btnUp.hide();
    console.log('!');
    for (let i = menuLinks.length - 1; i >= 0; i--) {
      let chapter = document.querySelector(menuLinks[i].hash);
      // если chapter.getBoundingClientRect().y < 0, значит позиция скролла под заголовком главы, добавим смещение в полэкрана
      if(chapter.getBoundingClientRect().y < window.innerHeight / 2) {
        setActiveLink(menuLinks[i]);
        break;
      }
    }
  }

  // перемещение к началу страницы при клике на кнопку наверх
  btnUp.el.addEventListener('click', function() {
    scrollOffset(0);
  });

  // скролл к нужной главе при клике на пункте меню
  delegate(menu, '.menu__link', 'click', scrollToChapter);
  function scrollToChapter(e) {
    e.preventDefault();
    let chapter = document.querySelector(this.hash);
    let coords = chapter.getBoundingClientRect();
    let topOffset = parseInt(window.getComputedStyle(content).marginTop);
    let offset = window.scrollY + coords.top - topOffset;
    scrollOffset(offset);
  }

  // подсветка активного пункта меню
  function setActiveLink(link) {
    menuLinks.forEach(item => item.classList.remove('menu__link-active'));
    link.classList.add('menu__link-active');
  }
});



// вспомогательные функции
function delegate(container, selector, eventName, handler) {
  container.addEventListener(eventName, function (e) {
    const el = e.target.closest(selector);
    if (el !== null && container.contains(el)) {
      handler.call(el, e);
    }
  });
}

function scrollOffset(top) {
  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}
