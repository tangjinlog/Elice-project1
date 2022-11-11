import { navTemplate } from '/common/nav.js';
const $ = (selector) => document.querySelector(selector);

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

/**fetch로 받아온 데이터를 반복문을 통해 list로 생성해주는 함수 */
const createGoods = (productDatas, productList) => {
	productDatas.forEach((product) => {
		const src = `/images/products/${product.productImage}`;
		console.log(product);

		//이미지마다 상품 고유의 id를 부여하고 각각 상품 고유 페이지로 이동할 수 있도록 href 처리
		productList.insertAdjacentHTML(
			'beforeend',
			`
		  <div class="productItem flex-col w-full h-full bg-slate-200">
		    <div class="grow w-full">
				<a href="/goods-detail/${product._id}">
				  <img class="h-4/6 " id="${product._id}" src="${
				src ? src : '../images/no-image.png'
			}" alt="상품이미지">		
				</a>

		    </div>
				<div class="p-2">
		    	<p>${product.name}</p>
				</div>
		    <div>
			    ${product.price}원
		    </div>
	    </div>
  `,
		);
	});
};

/**상품데이터를 fetch로 받아오고 category에 따라 필터링해주는 함수 */
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

	//모든 상품 정보를 불러와서 필터링이 완료된 후에 보여줄 상품목록을 생성
	createGoods(productDatas, productList);

	//각각의 상품 이미지마다 클릭이벤트를 달아서
	//클릭한 상품 이미지과 동일한 id를 가진 제품의 정보만 로컬스토리지에 저장
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
