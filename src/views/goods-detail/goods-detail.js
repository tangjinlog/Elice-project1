const $ = (selector) => document.querySelector(selector);
const btnAddCart = $('.addCart');
const manufacturerTag = $('.manufacturer');
const titleTag = $('.title');
const priceTag = $('.priceTag');
const descriptionTag = $('.description');
const countTag = $('.countTag');
import { navTemplate } from '/common/nav.js';

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

btnAddCart.addEventListener('click', () => {
	const manufacturer = manufacturerTag.innerText;
	const title = titleTag.innerText;
	const price = parseInt(priceTag.innerText);
	const description = descriptionTag.innerText;
	const count = parseInt(countTag.value);
	const checked = true;
	let productData = { manufacturer, title, price, description, count, checked };
	let cartData = window.localStorage.getItem('cart');
	if (!cartData) {
		cartData = [];
		cartData.push(productData);
	} else {
		cartData = JSON.parse(cartData);
		let isExist = false;
		cartData.forEach((eachItem) => {
			if (eachItem.title === title) {
				isExist = true;
			}
		});
		if (isExist) {
			cartData.forEach((eachItem) => {
				if (eachItem.title === title) {
					eachItem.count += count;
				}
			});
		} else {
			cartData.push(productData);
		}
	}

	cartData = JSON.stringify(cartData);
	window.localStorage.setItem('cart', cartData);
	//장바구니가 비어있으면 빈 배열을 만들고 상품데이터를 푸시해서 로컬 스토리지에 넣어주고
	//장바구니가 이미 있으면 상품 데이터 배열을 가져와서 파싱하고 푸쉬하고 다시 JSON화 해서 넣어줌
	alert('장바구니에 상품이 추가되었습니다.');
});

const showDetailData = () => {
	const detailData = JSON.parse(window.localStorage.getItem('detail'));
	console.log(detailData);
	titleTag.innerText = detailData[0].name;
	priceTag.innerText = detailData[0].price;
};

showDetailData();
