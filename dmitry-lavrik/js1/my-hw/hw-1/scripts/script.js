window.addEventListener('load', pageLoad);

function pageLoad() {
  let inputNum1 = document.querySelector('.num1');
  let inputNum2 = document.querySelector('.num2');
  let operator = document.querySelector('.operator');
  let btnEqually = document.querySelector('.equally');
  let outputResult = document.querySelector('.result');

  btnEqually.addEventListener('click', function () {
    outputResult.innerHTML = calculate(parseInt(inputNum1.value), parseInt(inputNum2.value), operator.value);
    btnEqually.disabled = true;
  });

  // разблокировать кнопку "=" при изменении операндов или оператора
  [inputNum1, inputNum2, operator].forEach(el => el.addEventListener('input', () => btnEqually.disabled = false));

  // удалить из полей ввода все кроме положительных целых цифр при вводе операндов
  [inputNum1, inputNum2].forEach(el => el.addEventListener('input', () =>
    el.value = el.value.replace(/[^0-9]/g, '')))
}

function calculate(num1, num2, operator) {
  let result;
  switch (operator) {
    case 'sum':
      result = num1 + num2;
      break;
    case 'sub':
      result = num1 - num2;
      break;
    case 'mult':
      result = num1 * num2;
      break;
    case 'div':
      result = num1 / num2;
      break;
  }
  return isNaN(result) ? 'Некорректный ввод' : result;
}

