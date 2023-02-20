window.addEventListener('load', function(){

	let btnAdd = document.querySelector('.btnAdd');
	let box = document.querySelector('.box');
	let items = document.querySelectorAll('.box .item');

	for(let i = 0; i < items.length; i++){
		items[i].addEventListener('click', changeColor);
	}

	btnAdd.addEventListener('click', function(){
		let div = document.createElement('div');
		div.classList.add('item');
		div.innerHTML = 'Text ' + (box.children.length + 1);
		div.addEventListener('click', changeColor);
		box.appendChild(div);
	});

});

function changeColor(){	
	let colors = ['#f00', '#ff0', '#0f0'];
	let num = Math.floor(Math.random() * colors.length);
	this.style.color = colors[num];
}
