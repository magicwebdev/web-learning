window.addEventListener('load', function(){
	
	let inp1 = document.querySelector('.num1');
	let inp2 = document.querySelector('.num2');
	let btnRun = document.querySelector('.btnRun');
	let resultBox = document.querySelector('.result');
	let operation = document.querySelector('.operation');
	let controls = [ inp1, inp2, operation ];

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
		controls.forEach(el => el.dataset.old = el.value);
		btnRun.disabled = true;
	});

	inp1.addEventListener('input', cleanInput);
	inp2.addEventListener('input', cleanInput);

	controls.forEach(el => el.addEventListener('input', enableBtn));

	function enableBtn(){
		btnRun.disabled = controls.every(el => el.dataset.old === el.value);
	}

	function cleanInput(){
		this.value = this.value.match(/-?[0-9]+\.?[0-9]*/g)[0];
	}
	
});
