window.addEventListener('load', function () {
  const menu = document.querySelector('.menu');
  const content = document.querySelector('.content');
  const btnUp = {
    el: document.querySelector('.up'),
    show() {
      this.el.classList.add('active');
    },
    hide() {
      this.el.classList.remove('active');
    }
  }

  btnUp.el.addEventListener('click', function() {
    scrollOffset(0);
  });

  window.addEventListener('scroll', function() {
    window.scrollY > window.innerHeight ? btnUp.show() : btnUp.hide();
  });

  delegate(menu, '.menu__link', 'click', scrollToChapter);

  function scrollToChapter(e) {
    e.preventDefault();
    let chapter = document.querySelector(this.hash);
    let coords = chapter.getBoundingClientRect();
    let topOffset = parseInt(window.getComputedStyle(content).marginTop);
    let offset = window.scrollY + coords.top - topOffset;
    scrollOffset(offset);
    setActiveLink(menu, this);
  }
});

function setActiveLink(menu, link) {
  menu.querySelectorAll('.menu__link').forEach((el) => {
    if (el === link) {
      el.classList.add('menu__link-active');
    } else {
      el.classList.remove('menu__link-active');
    }
  });
}

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
