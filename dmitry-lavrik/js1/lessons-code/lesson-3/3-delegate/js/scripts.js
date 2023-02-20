window.addEventListener('load', function(){

	let box = document.querySelector('.box');

	delegate(box, '.item', 'click', function(){	
		let colors = ['#f00', '#ff0', '#0f0'];
		let num = Math.floor(Math.random() * colors.length);
		this.style.color = colors[num];
	});
});

function delegate(box, selector, eventName, handler){
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e); // wtf??? не проходили
		}
	});
}