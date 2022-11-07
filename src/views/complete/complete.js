import { navTemplate } from '/common/nav.js';

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

const orderBtn = document.getElementById('orderDetailButton');
const shopBtn = document.getElementById('shoppingButton');

function changeToProducts(e) {
	const url = `/products`;
	console.log(url);
	location.href = url;
}

function changeToOrders(e) {
	const url = `/orders`;
	console.log(url);
	location.href = url;
}

shopBtn.addEventListener('click', changeToProducts);

orderBtn.addEventListener('click', changeToOrders);
