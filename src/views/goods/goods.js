import { navTemplate } from '/common/nav.js';
const $ = (selector) => document.querySelector(selector);

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

const createGoods = (productDatas, productList) => {
	productDatas.forEach((product) => {
		console.log(product);
		productList.insertAdjacentHTML(
			'beforeend',
			`
	  <a href="/goods-detail/${product._id}">
		  <div class="productItem flex-col w-full h-full bg-slate-200">
		    <div class="grow w-full">
				  <img id="${product._id}" src="${
				product.image ? product.image : '../images/no-image.png'
			}" alt="상품이미지">
		    </div>
		    <p>${product.name}</p>
		    <div>
			    ${product.price}원
		    </div>
	    </div>
		</a>
  `,
		);
	});
};

const loadAllProducts = async () => {
	const productList = document.querySelector('.product-list');
	const category = window.location.pathname.split('/')[2];
	const response = await fetch('/api/products');
	let productDatas = await response.json();
	if (category == 'normal') {
		productDatas = productDatas.filter((product) => product.category == '일반');
	} else if (category == 'incense-holder') {
		productDatas = productDatas.filter(
			(product) => product.category == '인센스홀더',
		);
	} else if (category == 'diffuser') {
		productDatas = productDatas.filter(
			(product) => product.category == '디퓨저',
		);
	}
	createGoods(productDatas, productList);
	const productItems = document.querySelectorAll('.productItem');
	productItems.forEach((productItem) => {
		productItem.addEventListener('click', (e) => {
			let productData = productDatas.filter(
				(product) => product._id == e.target.id,
			);
			productData = JSON.stringify(productData);
			window.localStorage.setItem('detail', productData);
		});
	});
};

loadAllProducts();
