window.addEventListener('load', function(){

	let btnPrev = document.querySelector('.gallery .buttons .prev');
	let btnNext = document.querySelector('.gallery .buttons .next');

	let images = document.querySelectorAll('.gallery .photos img');
	let i = 0;

	let animMoveToLeft = [
		{ transform: 'scale(1) rotate(0)' },
		{ transform: 'scale(0.01) rotate(520deg)' }
	];

	let animMoveToRight = [
		{ transform: 'scale(1) rotate(0)' },
		{ transform: 'scale(0.01) rotate(-520deg)' }
	];

	btnPrev.addEventListener('click', function(){
		let imgHide = images[i];
		i--;

		if(i < 0){
			i = images.length - 1;
		}

		toggleSlides(imgHide, images[i], false);
	});

	btnNext.addEventListener('click', function(){
		let imgHide = images[i];
		i++;

		if(i >= images.length){
			i = 0;
		}

		toggleSlides(imgHide, images[i], true);
	});

	function toggleSlides(imgHide, imgShow, isNext){
		imgHide.classList.remove('showed');
		let anim = imgHide.animate(isNext ? animMoveToLeft : animMoveToRight, { duration: 500 });

		anim.addEventListener('finish', function(){
			imgShow.classList.add('showed');
			imgShow.animate(isNext ? animMoveToRight : animMoveToLeft, { duration: 500, direction: 'reverse' });
		});
	}
});

/* if(isNext){
	imgHide.classList.remove('showed');
	imgHide.animate(animMoveToLeft, { duration: 500 });

	imgShow.classList.add('showed');
	imgShow.animate(animMoveToRight, { duration: 500, direction: 'reverse' });
}
else{
	imgHide.classList.remove('showed');
	imgHide.animate(animMoveToRight, { duration: 500 });

	imgShow.classList.add('showed');
	imgShow.animate(animMoveToLeft, { duration: 500, direction: 'reverse' });
}  */