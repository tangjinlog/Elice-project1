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

const checkoutBtn = $('.checkoutBtn');

/**직접선택 선택시에만 인풋을 보여주기 위한 함수*/
userRequestInput.addEventListener('change', (e) => {
	if (e.target.value == 'userWrite') {
		userWriteInput.classList.remove('hidden');
	} else {
		userWriteInput.classList.add('hidden');
	}
});

const store = window.localStorage;

//checked된 상태인 상품만 로컬스토리지에서 받아와서 저장
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

/**결제정보를 보여주기 위한 함수 */
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

/**결제된 상품을 장바구니에서 제거해주는 함수 */
const removePurchasedItems = () => {
	const removeList = [];
	JSON.parse(store.getItem('cart')).forEach((item) => {
		if (!item.checked) removeList.push(item);
	});
	store.setItem('cart', JSON.stringify(removeList));
};

const token = window.sessionStorage.getItem('token');
checkoutBtn.addEventListener('click', (e) => {
	const postalCode = postNumInput.value;
	const address1 = address1Input.value;
	const address2 = address2Input.value;
	const request =
		userRequestInput.value != 'userWrite'
			? userRequestInput.value
			: userInput.value;
	e.preventDefault();

	//결제 확인창을 띄우기 위한 기능
	if (confirm('결제하시겠습니까?')) {
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
		removePurchasedItems();
	} else {
		alert('결제가 취소되었습니다');
	}
});
