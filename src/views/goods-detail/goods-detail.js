const $ = (selector) => document.querySelector(selector);
const store = window.localStorage;
const btnAddCart = $('.addCart');
const titleTag = $('.title');
const priceTag = $('.priceTag');
const descriptionTag = $('.description');
const countTag = $('.countTag');
const productImage = $('.image');
const nowPurchaseBtn = document.getElementById('shoppingButton');
import { navTemplate } from '/common/nav.js';

/**nav Template*/
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

let detailData = JSON.parse(store.getItem('detail'))[0];

/**1미만의 값이 입력되지 않도록 방지해주는 함수 */
const checkValidCount = () => {
	countTag.addEventListener('change', (e) => {
		if (e.target.value < 1) {
			alert('올바른 값을 입력해주세요');
			e.target.value = 1;
		}
	});
};

//장바구니에 상품을 추가하면 로컬스토리지에 추가해주기 위한 기능
btnAddCart.addEventListener('click', () => {
	const count = parseInt(countTag.value);
	const checked = true;
	const name = detailData.name;
	let productData = { ...detailData, count, checked };
	let cartData = window.localStorage.getItem('cart');

	//장바구니에 똑같은 제품을 추가하면 count만 추가해주고
	//다른 상품을 추가했으면 로컬 스토리지 배열에 상품을 추가
	if (!cartData) {
		cartData = [];
		cartData.push(productData);
	} else {
		cartData = JSON.parse(cartData);
		let isExist = false;
		cartData.forEach((eachItem) => {
			if (eachItem.name === name) {
				isExist = true;
			}
		});
		if (isExist) {
			cartData.forEach((eachItem) => {
				if (eachItem.name === name) {
					eachItem.count += count;
				}
			});
		} else {
			cartData.push(productData);
		}
	}

	cartData = JSON.stringify(cartData);
	window.localStorage.setItem('cart', cartData);
	alert('장바구니에 상품이 추가되었습니다.');
});

//구매하기 버튼을 누르면 장바구니 페이지로 이동해주기 위한 기능
nowPurchaseBtn.addEventListener('click', () => {
	window.location.href = '/cart';
});

/**로컬스토리지의 detail데이터를 화면에 보여주기 위한 함수 */
const showDetailData = () => {
	productImage.src = `/images/products/${detailData.productImage}`;
	titleTag.innerText = `상품이름: ${detailData.name}`;
	priceTag.innerText = `상품가격: ${detailData.price}원`;
	descriptionTag.innerText = detailData.detailDescription;
};

showDetailData();
checkValidCount();
