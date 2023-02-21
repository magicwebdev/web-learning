window.addEventListener('load', function () {
  let inputs = document.querySelectorAll('.check');
  let form = document.querySelector('.form');
  const validationRules = {
    name: {
      pattern: /^[a-z0-9_-]{3,16}$/,
      message: 'Поле не может быть пустым',
    },
    phone: {
      pattern: /^((7|8)+([0-9]){10})$/,
      message: 'В поле должен быть корректный номер телефона',
    },
    email: {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/,
      message: 'В поле должен быть корректный email',
    }
  };

  form.addEventListener('submit', (e) => {
    let hasError = false;
    inputs.forEach((input) => {
      let rule = validationRules[input.dataset.rule];
      if (rule !== undefined && !rule.pattern.test(input.value)) {
        input.classList.add('err');
        showErrorMessage(input, rule.message);
        hasError = true;
      }
    });
    if (hasError) {
      e.preventDefault();
    }
  });

  form.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('check')) {
      e.target.classList.remove('err');
      showErrorMessage(e.target, '');
    }
  });
  form.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('check') && e.target.value.trim().length < 1) {
      e.target.classList.add('err');
      showErrorMessage(e.target, 'Поле не может быть пустым');
    }
  });
});

function showErrorMessage(input, message) {
  let container = input.closest('.input-wrapper');
  let el = container.querySelector('.error-message');
  if(message) {
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }
  el.innerText = message;
}