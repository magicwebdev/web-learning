/* function sum(a, b){
	return a + b;
}

let sum = function(a, b){
	return a + b;
}

let sum = (a, b) => {
	return a + b;
}
 */
/* let sum = (a, b) => a + b;
let double = a => a * 2; */

/* let users = [
	{ id: 1, name: 'Дмитрий', role: 'admin' },
	{ id: 2, name: 'dfds', role: 'agent' },
	{ id: 3, name: 'dsfdfs', role: 'admin' }
];

console.log(users.filter(user => user.role === 'admin'))

console.log(users.filter(function(user){
	return user.role === 'admin';
})); */

/* document.querySelector('.sample').addEventListener('click', function(){
	let div = this;

	setTimeout(function(){
		div.style.color = 'red';
	}, 1000);
	
});
 */

document.querySelector('.sample').addEventListener('click', function(){
	setTimeout(() => {
		this.style.color = 'red';
	}, 1000);
});
