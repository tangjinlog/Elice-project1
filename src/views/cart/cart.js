import { navTemplate } from '/common/nav.js';
addNav();

//selectors
const $ = (selector) => document.querySelector(selector);
const store = window.localStorage;
const cartContainer = $('.cart-products-container');
const selectAllBtn = $('.selectAllBtn');
const removeCheckedInput = $('.removeChecked');

/**상단 navbar 모듈*/
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}

const showProductCounts = () => {
	const allPrices = document.querySelectorAll('.eachPrice');
	const allPricesData = [];
	JSON.parse(store.getItem('cart')).forEach((item) => {
		allPricesData.push(item.price * item.count);
	});
	allPrices.forEach(
		(eachPrice, index) => (eachPrice.innerText = allPricesData[index] + '원'),
	);

	console.log(allPricesData);
};

/**상품 checked상태를 받아와서 그대로 화면에 보여주기 위한 함수 */
const loadCheckedState = (isCheckedList) => {
	const allCheckBoxes = document.querySelectorAll('.cartCheckBox');
	allCheckBoxes.forEach((eachCheckBox, index) => {
		eachCheckBox.checked = isCheckedList[index];
	});
};

/**전체선택 버튼 기능구현을 위한 함수*/
const selectAll = () => {
	const allCheckBoxes = document.querySelectorAll('.cartCheckBox');
	const checkedVals = [];
	allCheckBoxes.forEach((checkbox) => checkedVals.push(checkbox.checked));
	let cartData = JSON.parse(store.getItem('cart'));
	if (!checkedVals.includes(false)) {
		allCheckBoxes.forEach((checkbox) => {
			checkbox.checked = false;
		});
		cartData.forEach((item) => (item.checked = false));
	} else {
		allCheckBoxes.forEach((checkbox) => (checkbox.checked = true));
		cartData.forEach((item) => (item.checked = true));
	}
	cartData = JSON.stringify(cartData);
	store.setItem('cart', cartData);
};

/**선택삭제 버튼 기능구현을 위한 함수*/
const removeChecked = () => {
	const allCheckBoxes = document.querySelectorAll('.cartCheckBox');
	removeCheckedInput.addEventListener('click', () => {
		const checked_list = [];
		allCheckBoxes.forEach((checkbox) => {
			if (checkbox.checked)
				checked_list.push(
					checkbox.nextElementSibling.nextElementSibling.children[0].innerText,
				);
		});
		let newCartData = [];
		let cartData = JSON.parse(store.getItem('cart'));
		cartData.forEach((product) => {
			if (!checked_list.includes(product.name)) {
				newCartData.push(product);
			}
		});
		newCartData = JSON.stringify(newCartData);
		store.setItem('cart', newCartData);
		showPayInfo();
		window.location.reload();
	});
};

/**물건 수량 변경시 로컬 스토리지 상품 데이터의 count값을 바꿔서 저장해주기 위한 함수*/
const changeItemNum = () => {
	const productCounts = document.querySelectorAll('.productCount');
	productCounts.forEach((productCount) => {
		productCount.addEventListener('change', (e) => {
			if (e.target.value < 1) {
				alert('올바른 수량을 입력해주세요');
				e.target.value = 1;
			} else {
				const cartData = JSON.parse(store.getItem('cart'));
				cartData[e.target.id].count = parseInt(e.target.value);
				store.setItem('cart', JSON.stringify(cartData));
			}
			showPayInfo();
			showProductCounts();
		});
	});
};
/**물건 체크시 checked 상태를 로컬 스토리지에 업데이트하기 위한 함수*/
const changeCheck = () => {
	const allCheckBoxes = document.querySelectorAll('.cartCheckBox');
	allCheckBoxes.forEach((eachCheckBox) => {
		eachCheckBox.addEventListener('change', (e) => {
			let cartData = JSON.parse(store.getItem('cart'));
			const name =
				e.target.nextElementSibling.nextElementSibling.children[0].innerText;
			cartData.forEach((item) => {
				if (item.name === name) {
					item.checked ? (item.checked = false) : (item.checked = true);
				}
			});
			store.setItem('cart', JSON.stringify(cartData));
			showPayInfo();
		});
	});
};

/**결제정보를 보여주기 위한 함수*/
const showPayInfo = () => {
	const totalNumsTag = $('.totalNums');
	const totalPriceTag = $('.totalPrice');
	const deliveryFeeTag = $('.deliveryFee');
	const paymentTag = $('.payment');
	const cartData = JSON.parse(store.getItem('cart'));
	let totalNums = 0;
	let totalPrice = 0;
	cartData.forEach((item) => {
		if (item.checked) {
			totalNums += item.count;
			totalPrice += item.price * item.count;
		}
	});
	totalNumsTag.innerText = `${totalNums}개`;
	totalPriceTag.innerText = `${totalPrice}원`;
	deliveryFeeTag.innerText =
		totalPrice < 20000 ? (totalPrice ? `3000원` : null) : `무료배송`;
	paymentTag.innerText = `${
		totalPrice < 20000 ? (totalPrice ? totalPrice + 3000 : 0) : totalPrice
	}원`;
};

/**카트에 담긴 상품데이터를 불러와 화면에 보여주기 위한 함수*/
const loadCartList = async () => {
	let cartData = store.getItem('cart');
	cartData = JSON.parse(cartData);
	let isCheckedList = [];
	cartData.forEach((item, index) => {
		const { price, name, count } = item;
		isCheckedList.push(item.checked);
		cartContainer.insertAdjacentHTML(
			'beforeend',
			`		<div class="cartList px-4 border-t border-black  w-full h-24 flex">
		<input  type="checkbox" class="cartCheckBox"/>
		<figure class="imgArea w-[20%]"><img /></figure>
		<div class="nameArea w-[40%] m-auto flex">
			<p class="productName text-center ">${name}</p>
			<input
				id = ${index}
				class=" ml-auto productCount  w-10 text-center border border-black rounded-xl"
				type="number"
				value=${count}
			/>
		</div>
		<div class="eachPrice w-[40%] text-center my-auto">${price * count}원</div>
		`,
		);
	});
	loadCheckedState(isCheckedList);
	removeChecked();
	changeItemNum();
	changeCheck();
	showPayInfo();
	selectAllBtn.addEventListener('click', () => {
		selectAll();
		showPayInfo();
	});
};

loadCartList();
