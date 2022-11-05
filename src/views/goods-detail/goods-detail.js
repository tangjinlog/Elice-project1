const $ = (selector) => document.querySelector(selector);
const btnAddCart = $('.addCart');
const manufacturer = $('.manufacturer').innerText;
const title = $('.title').innerText;
const price = $('.priceTag').innerText;
const description = $('.description').innerText;

btnAddCart.addEventListener('click', () => {
	window.localStorage.setItem('manufacturer', manufacturer);
	window.localStorage.setItem('title', title);
	window.localStorage.setItem('price', price);
	window.localStorage.setItem('description', description);
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
