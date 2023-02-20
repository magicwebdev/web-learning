window.addEventListener('load', function(){

	let box = document.querySelector('.box');

	box.addEventListener('click', function(e){
		let elem = e.target.closest('.item');

		if(elem !== null && box.contains(elem)){
			changeColor(elem);
		}
	});
});

function changeColor(el){	
	let colors = ['#f00', '#ff0', '#0f0'];
	let num = Math.floor(Math.random() * colors.length);
	el.style.color = colors[num];
}
