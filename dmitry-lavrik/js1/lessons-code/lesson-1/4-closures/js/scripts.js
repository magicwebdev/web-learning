window.addEventListener('load', function(){
	let div = document.querySelector('.some');
	let btn = document.querySelector('.btnColor');
	let colors = ['#f00', '#ff0', '#0f0'];

	div.addEventListener('mouseenter', function(){	
		let num = Math.floor(Math.random() * colors.length);
		div.style.color = colors[num];
	});

	btn.addEventListener('click', function(){
		colors.push('#f90');
	});
});

/*
function init(){
	let x = 100;

	setTimeout(function(){
		console.log(x);
	}, 3000);
}

init();
console.log('init function is over'); 
 */
/* let x = 1;

function some(){
	let x = 10;

	function other(){
		x = 100;
		console.log(x);
	}

	other();
	console.log(x);
}

some(); */
