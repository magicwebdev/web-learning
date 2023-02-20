// не в этой реальности...
// просто учебеный пример, не трогайте стандартные классы!!!!!
HTMLElement.prototype.delegate = function delegate(selector, eventName, handler){
	let box = this;
	
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e); // wtf??? не проходили
		}
	});
}

window.addEventListener('load', function(){
	
	let calculator = document.querySelector('.calculator');
	let inp1 = document.querySelector('.num1');
	let inp2 = document.querySelector('.num2');
	let btnRun = document.querySelector('.btnRun');
	let resultBox = document.querySelector('.result');
	let operation = document.querySelector('.operation');

	btnRun.addEventListener('click', function(){
		let num1 = parseInt(inp1.value);
		let num2 = parseInt(inp2.value);
		let total;

		switch(operation.value){
			case 'sum':
				total = num1 + num2;
				break;
			case 'sub':
				total = num1 - num2;
				break;
			case 'mult':
				total = num1 * num2;
				break;
			case 'div':
				total = num1 / num2;
				break;
		}
		
		if(isNaN(total)){
			total = 'Некорректный ввод';
		}

		resultBox.innerHTML = total;
		btnRun.disabled = true;
	});

	calculator.delegate('input,select', 'input', function(){
		btnRun.disabled = false;
	});

	calculator.delegate('.num1,.num2', 'input', function(){
		this.value = this.value.replace(/[^0-9]/g, '');
	});
});