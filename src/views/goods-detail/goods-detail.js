const $ = (selector) => document.querySelector(selector);
const btnAddCart = $('.addCart');
const manufacturer = $('.manufacturer').innerText;
const title = $('.title').innerText;
const price = $('.priceTag').innerText;
const description = $('.description').innerText;
import { navTemplate } from '/common/nav.js';

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

btnAddCart.addEventListener('click', () => {
	let productData = { manufacturer, title, price, description };
	productData = JSON.stringify(productData);
	window.localStorage.setItem('1', productData);
	alert('상품이 장바구니에 추가되었습니다');
});

const loadProductData = async () => {
	const response = await fetch('/api/productlist');
	const products = await response.json();
	const productCon = document.querySelector('.productCon');
	console.log(products);

	// products.map((product) => {
	// 	console.log(product);
	// 	const { title, price, detailDescription } = product;
	// });
};

loadProductData();
