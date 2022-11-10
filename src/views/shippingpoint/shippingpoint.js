import { navTemplate } from '/common/nav.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

const $ = (selector) => document.querySelector(selector);

//주문자정보
const postNumInput = $('.postNum');
const address1Input = $('.address1');
const address2Input = $('.address2');
const userRequestInput = $('.userRequest');
const userWriteInput = $('.userWrite');
const userInput = $('.userInput');

//결제정보
const checkoutBtn = $('.checkoutBtn');

//구매하기 버튼을 클릭시 실행되는 함수

//직접선택 선택시에만 인풋을 보여주기 위한 함수
userRequestInput.addEventListener('change', (e) => {
	if (e.target.value == 'userWrite') {
		userWriteInput.classList.remove('hidden');
	} else {
		userWriteInput.classList.add('hidden');
	}
});

const store = window.localStorage;
console.log(JSON.parse(store.getItem('cart')));
const checkedProducts = JSON.parse(store.getItem('cart')).filter(
	(product) => product.checked == true,
);
console.log(checkedProducts);
let totalNums = 0;
let totalPrice = 0;
checkedProducts.forEach((item) => {
	totalNums += item.count;
	totalPrice += item.price * item.count;
});
const deliveryFee = totalPrice < 20000 ? 3000 : 0;
const finalPrice = totalPrice + deliveryFee;

const showPayInfo = () => {
	const totalNumsInput = $('.totalNums');
	const totalPriceInput = $('.totalPrice');
	const deliveryFeeInput = $('.deliveryFee');
	const finalPriceInput = $('.finalPrice');
	totalNumsInput.innerHTML = totalNums + '개';
	totalPriceInput.innerHTML = totalPrice + '원';
	deliveryFeeInput.innerHTML =
		deliveryFee == 0 ? '무료배송' : deliveryFee + '원';
	finalPriceInput.innerHTML = finalPrice + '원';
};
showPayInfo();

function sendPost(url, params) {
	var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('target', '_blank');
	form.setAttribute('action', url);

	for (var key in params) {
		var hiddenField = document.createElement('input');
		hiddenField.setAttribute('type', 'hidden');
		hiddenField.setAttribute('name', key);
		hiddenField.setAttribute('value', params[key]);
		form.appendChild(hiddenField);
	}

	document.body.appendChild(form);
	form.submit();
}
const token = window.sessionStorage.getItem('token');
checkoutBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const postalCode = postNumInput.value;
	const address1 = address1Input.value;
	const address2 = address2Input.value;
	const request =
		userRequestInput.value != 'userWrite'
			? userRequestInput.value
			: userInput.value;

	fetch('/api/order', {
		method: 'post',
		headers: { Authorization: token },
		body: {
			userId: '아무거나',
			totalPrice,
			address: { postalCode, address1, address2 },
			request,
		},
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
});
