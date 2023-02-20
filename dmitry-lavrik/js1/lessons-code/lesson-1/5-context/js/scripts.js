window.addEventListener('load', function(){
	let some = document.querySelector('.some');
	let other = document.querySelector('.other');

	some.addEventListener('mouseenter', changeColor);
	other.addEventListener('click', changeColor);
});

function changeColor(){	
	let colors = ['#f00', '#ff0', '#0f0'];
	let num = Math.floor(Math.random() * colors.length);
	this.style.color = colors[num];
}

/*
	this

	умн 2 на 2

	умн свой доход на 10
	на своём лбу напишите этц цифру

	let targetCost = this.costPerMonth * 10;
	this.head.innerHTML = targetCost;
*/