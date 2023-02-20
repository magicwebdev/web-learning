window.addEventListener('load', function(){

	let btnAdd = document.querySelector('.btnAdd');
	let box = document.querySelector('.box');

	box.addEventListener('click', function(e){
		if(e.target.classList.contains('item')){
			changeColor(e.target);
		}
	});

	btnAdd.addEventListener('click', function(){
		let div = document.createElement('div');
		div.classList.add('item');
		div.innerHTML = 'Text ' + (box.children.length + 1);
		box.appendChild(div);
	});

});

function changeColor(el){	
	let colors = ['#f00', '#ff0', '#0f0'];
	let num = Math.floor(Math.random() * colors.length);
	el.style.color = colors[num];
}
