window.addEventListener('load', function(){
	
	let agr = document.querySelector('.agrrement');
	let btn = document.querySelector('.send');
	
	btn.addEventListener('click', function(){
		//console.log(agr.getAttribute('checked'));
		console.log(agr.checked);
		//alert('done');
	});

	/* agr.setAttribute('aaa', '111');
	console.log(agr.getAttribute('aaa'));
	console.log(agr.aaa);
	agr.bbb = 1;
	console.log(agr.bbb);
	console.log(agr.getAttribute('bbb')); */
	//agr.checked = true;
});

/*
<div class="sample">
	<input type="checkbox" class="agrrement">
</div>

DOM {
	body: {
		children: [
			HTMLDivElement div: {
				className: sample,
				chidren: [
					HTMLInputElement input: {
						attributes: [type="checkbox" class="agrrement"]
						type: 'checkbox'
						className: 'agrrement'
						checked: true
						...
					}
				]
			}
		]
	}
}


*/