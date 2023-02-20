window.addEventListener('load', function(){
	
	let items = document.querySelectorAll('.box .item');

	for(let i = 0; i < items.length; i++){
		items[i].addEventListener('click', changeColor);
	}

});

function changeColor(){	
	let colors = ['#f00', '#ff0', '#0f0'];
	let num = Math.floor(Math.random() * colors.length);
	this.style.color = colors[num];
}

// items.forEach(el => )