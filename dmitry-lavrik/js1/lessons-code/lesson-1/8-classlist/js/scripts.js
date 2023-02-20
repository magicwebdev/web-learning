window.addEventListener('load', function(){
	
	let items = document.querySelectorAll('.box .item');

	for(let i = 0; i < items.length; i++){
		items[i].addEventListener('click', changeState);
	}

});

function changeState(){	
	this.classList.toggle('item-active');
	let color = this.classList.contains('item-active') ? this.dataset.color : 'inherit';
	this.style.color = color;
}

/*
	HTMLElement
		classList
			.add(classname)
			.remove(classname)
			.contains(classname)
			.toggle(classname)

			if(contains(classname))
				remove(classname)
			else
				add(classname)
*/