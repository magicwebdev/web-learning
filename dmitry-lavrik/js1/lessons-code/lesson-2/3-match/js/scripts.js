window.addEventListener('load', function(){
	
	let inp1 = document.querySelector('.num1');
	let inp2 = document.querySelector('.num2');
	let btnRun = document.querySelector('.btnRun');
	let resultBox = document.querySelector('.result');
	let operation = document.querySelector('.operation');

	btnRun.addEventListener('click', function(){
		let num1 = parseFloat(inp1.value);
		let num2 = parseFloat(inp2.value);
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
		inp1.dataset.last = inp1.value;
		inp2.dataset.last = inp2.value;
		operation.dataset.last = operation.value;
		btnRun.disabled = true;
	});

	inp1.addEventListener('input', cleanInput);
	inp2.addEventListener('input', cleanInput);

	inp1.addEventListener('input', enableBtn);
	inp2.addEventListener('input', enableBtn);
	operation.addEventListener('input', enableBtn);

	function enableBtn(){
		btnRun.disabled = (
			inp1.dataset.last === inp1.value && 
			inp2.dataset.last === inp2.value &&
			operation.dataset.last === operation.value 
		);
	}

	function cleanInput(){
		this.value = this.value.match(/-?[0-9]+\.?[0-9]*/g)[0];
	}
	
});
