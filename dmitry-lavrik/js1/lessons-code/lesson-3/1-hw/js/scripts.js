window.addEventListener('load', function(){

	let form = document.querySelector('.form');
	let inputs = form.querySelectorAll('.check');

	form.addEventListener('submit', function(e){
		let hasError = false;
		
		for(let i = 0; i < inputs.length; i++){
			let inp = inputs[i];

			if(inp.value === ''){
				inp.classList.add('err');
				hasError = true;
			}
		}

		if(hasError){
			e.preventDefault();
		}
	});

	form.addEventListener('focusin', function(e){
		if(e.target.classList.contains('check')){
			e.target.classList.remove('err');
		}
	});
});

/* 
form.addEventListener('submit', function(e){
	let hasError = inputs.some(incorrectInp);
	
	inputs.forEach(inp => {
		if(incorrectInp(inp)){
			inp.classList.add('err');
		}
	});
	
	if(hasError){
		e.preventDefault();
	}
});

function incorrectInp(inp){
	return inp.value === '';
} */

/*
	for
	for in
	for of a
	[].forEach

*/