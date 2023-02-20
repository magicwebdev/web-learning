window.onload = function(){
	let div = document.querySelector('.some');
	
	div.onclick = function(){
		div.innerHTML += 1;
	}

	div.onclick = function(){
		div.innerHTML += 2;
	}
}