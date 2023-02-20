window.addEventListener('load', function(){
	
	let calculator = document.querySelector('.calculator');
	let inp1 = document.querySelector('.num1');
	let inp2 = document.querySelector('.num2');
	let btnRun = document.querySelector('.btnRun');
	let resultBox = document.querySelector('.result');
	let operation = document.querySelector('.operation');
	let mathOps = {
		sum: (a, b) => a + b,
		sub: (a, b) => a - b,
		mult: (a, b) => a * b,
		div: (a, b) => a / b,
	};

	btnRun.addEventListener('click', function(){
		let num1 = parseInt(inp1.value);
		let num2 = parseInt(inp2.value);
		let total = mathOps[operation.value](num1, num2);

		if(isNaN(total)){
			total = 'Некорректный ввод';
		}

		resultBox.innerHTML = total;
		btnRun.disabled = true;
	});

	delegate(calculator, 'input,select', 'input', function(){
		btnRun.disabled = false;
	});

	delegate(calculator, '.num1,.num2', 'input', function(){
		this.value = this.value.replace(/[^0-9]/g, '');
	});
});

function delegate(box, selector, eventName, handler){
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e); // wtf??? не проходили
		}
	});
}

/* 		let v = operation.value;
		let fn = mathOps[v];
		let total = fn(num1, num2); */

/* function sum(a, b){ 
	return a + b 
}

let sum = function(a, b){ 
	return a + b 
}

let sum = (a, b) => { 
	return a + b 
}

let sum = (a, b) => a + b; */

/* [10, 5, 8, 9, 1].filter(num => num > 5) */