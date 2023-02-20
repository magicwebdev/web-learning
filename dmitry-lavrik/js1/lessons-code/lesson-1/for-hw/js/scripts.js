window.addEventListener('load', function(){
	
	let inp1 = document.querySelector('.num1');
	let inp2 = document.querySelector('.num2');
	let btnRun = document.querySelector('.btnRun');
	let resultBox = document.querySelector('.result');

	btnRun.addEventListener('click', function(){
		let total = parseInt(inp1.value) + parseInt(inp2.value);
		resultBox.innerHTML = total;
	});

});
