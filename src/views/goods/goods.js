import { navTemplate } from '/common/nav.js';
const $ = (selector) => document.querySelector(selector);

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

const loadAllProducts = async () => {
	const response = await fetch('/api/productlist');
	const productDatas = await response.json();
	const productList = document.querySelector('.product-list');

	productDatas.forEach((product) => {
		productList.insertAdjacentHTML(
			'beforeend',
			`
	  <a href="../goods-detail/goods-detail.html">
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
