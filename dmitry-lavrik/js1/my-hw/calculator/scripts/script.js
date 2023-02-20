window.addEventListener('load', pageLoad);

function pageLoad() {
  let inputNum1 = document.querySelector('.num1');
  let inputNum2 = document.querySelector('.num2');
  let operator = document.querySelector('.operator');
  let btnEqually = document.querySelector('.equally');
  let outputResult = document.querySelector('.result');
  let mathOperations = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mult: (a, b) => a * b,
    div: (a, b) => a / b,
  };

  // посчитать результат операции
  btnEqually.addEventListener('click', () => {
    let num1 = parseInt(inputNum1.value);
    let num2 = parseInt(inputNum2.value);
    let result = mathOperations[operator.value](num1, num2);
    isNaN(result) ? 'Некорректный ввод' : (outputResult.innerHTML = result);
    btnEqually.disabled = true;
  });

  // разблокировать кнопку "=" при изменении операндов или оператора
  [inputNum1, inputNum2, operator].forEach((el) =>
    el.addEventListener('input', () => (btnEqually.disabled = false))
  );

  // удалить из полей ввода все кроме положительных целых цифр при вводе операндов
  [inputNum1, inputNum2].forEach((el) =>
    el.addEventListener('input', () => (el.value = el.value.replace(/[^0-9]/g, '')))
  );
}
