import { navTemplate } from '/common/nav.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();
const $ = (selector) => document.querySelector(selector);

//주문자정보
const userNameInput = $('.userName');
const userPhoneNumberInput = $('.userPhoneNumber');
const postNumInput = $('.postNum');
const address1Input = $('.address1');
const address2Input = $('.address2');
const userRequestInput = $('.userRequest');
const userWriteInput = $('.userWrite');
const userInput = $('.userInput');

const checkoutBtn = $('.checkoutBtn');

//직접선택 선택시에만 인풋을 보여주기 위한 함수
userRequestInput.addEventListener('change', (e) => {
	if (e.target.value == 'userWrite') {
		userWriteInput.classList.remove('hidden');
	} else {
		userWriteInput.classList.add('hidden');
	}
});

const store = window.localStorage;
const checkedProducts = JSON.parse(store.getItem('cart')).filter(
	(product) => product.checked == true,
);
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

const token = window.sessionStorage.getItem('token');
checkoutBtn.addEventListener('click', (e) => {
	const userName = userNameInput.value;
	const userPhoneNumber = userPhoneNumberInput.value;
	const postalCode = postNumInput.value;
	const address1 = address1Input.value;
	const address2 = address2Input.value;
	const request =
		userRequestInput.value != 'userWrite'
			? userRequestInput.value
			: userInput.value;
	e.preventDefault();

	fetch('/api/order', {
		method: 'post',
		headers: {
			authorization: `bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			totalPrice: finalPrice,
			address: { postalCode, address1, address2 },
			request,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.result == 'error') {
				alert('입력값이 올바른지 확인해주세요');
				console.error(data.reason);
			} else {
				window.location.href = '/complete';
			}
		});
});
