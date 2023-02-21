window.addEventListener('load', function(){

	let form = document.querySelector('.form');
	let inputs = form.querySelectorAll('.check');
	let validation = {
		name: /^.{2,32}$/,
		phone: /^\d{7,15}$/,
		email: /^.+@.+\..+$/
	};

	form.addEventListener('submit', function(e){
		let hasError = false;
		
		for(let i = 0; i < inputs.length; i++){
			let inp = inputs[i];
			let pattern = validation[inp.dataset.rule];

			if(!pattern.test(inp.value)){
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