window.addEventListener('load', function () {
  let inputs = document.querySelectorAll('.check');
  let form = document.querySelector('.form');

  form.addEventListener('submit', (e) => {
    let hasError = false;
    inputs.forEach((input) => {
      if (input.value.trim().length < 1) {
        input.classList.add('err');
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
    }
  });
  form.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('check') && e.target.value.trim().length < 1) {
      e.target.classList.add('err');
    }
  });
});
