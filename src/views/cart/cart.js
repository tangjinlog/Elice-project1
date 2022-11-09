import { navTemplate } from '/common/nav.js';
addNav();

//selectors
const $ = (selector) => document.querySelector(selector);
const cartContainer = $('.cart-products-container');
const allSelectCheckbox = document.getElementById('allSelectCheckbox');
const removeCheckedInput = $('.removeChecked');

let allCheckBoxes;
//functions
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}

const selectAll = () => {
	allCheckBoxes = document.querySelectorAll('.cartCheckBox');
	allSelectCheckbox.addEventListener('click', () => {
		const checkedVals = [];
		allCheckBoxes.forEach((checkbox) => checkedVals.push(checkbox.checked));
		if (!checkedVals.includes(false)) {
			allCheckBoxes.forEach((checkbox) => (checkbox.checked = false));
		} else {
			allCheckBoxes.forEach((checkbox) => (checkbox.checked = true));
		}
	});
};

const removeChecked = () => {
	removeCheckedInput.addEventListener('click', () => {
		const checked_list = [];
		allCheckBoxes.forEach((checkbox) => {
			if (checkbox.checked)
				checked_list.push(
					checkbox.nextElementSibling.nextElementSibling.children[0].innerText,
				);
		});
		let newCartData = [];
		let cartData = JSON.parse(window.localStorage.getItem('cart'));
		cartData.forEach((product) => {
			if (!checked_list.includes(product.title)) {
				newCartData.push(product);
			}
		});
		newCartData = JSON.stringify(newCartData);
		window.localStorage.setItem('cart', newCartData);
		window.location.reload();
	});
};

const changeItemNum = () => {
	const productCounts = document.querySelectorAll('.productCount');
	productCounts.forEach((productCount) => {
		productCount.addEventListener('change', (e) => {
			if (e.target.value < 1) {
				alert('올바른 수량을 입력해주세요');
				e.target.value = 1;
			} else {
				const cartData = JSON.parse(window.localStorage.getItem('cart'));
				cartData[e.target.id].count = parseInt(e.target.value);
				window.localStorage.setItem('cart', JSON.stringify(cartData));
				window.location.reload();
			}
		});
	});
};

const showPayInfo = () => {
	const totalNumsTag = $('.totalNums');
	const totalPriceTag = $('.totalPrice');
	const deliveryFeeTag = $('.deliveryFee');
	const paymentTag = $('.payment');
	const cartData = JSON.parse(window.localStorage.getItem('cart'));

	let totalNums = 0;
	let totalPrice = 0;
	cartData.forEach((eachItem) => {
		totalNums += eachItem.count;
		totalPrice += eachItem.count * eachItem.price;
	});
	totalNumsTag.innerText = `${totalNums}개`;
	totalPriceTag.innerText = `${totalPrice}원`;
	if (totalPrice > 30000) {
		deliveryFeeTag.innerText = '무료';
		paymentTag.innerText = totalPriceTag.innerText;
	} else {
		deliveryFeeTag.innerText = '3000원';
		paymentTag.innerText = `${totalPrice + 3000}원`;
	}
};

const loadCartList = async () => {
	let cartData = window.localStorage.getItem('cart');
	cartData = JSON.parse(cartData);
	cartData.forEach((item, index) => {
		const price = item.price;
		const name = item.title;
		const count = item.count;
		cartContainer.insertAdjacentHTML(
			'beforeend',
			`		<div class="cartList bg-sky-300  w-full h-24 flex">
		<input type="checkbox" class="cartCheckBox"/>
		<figure class="imgArea w-[20%]"><img /></figure>
		<div class="nameArea w-[20%] m-auto">
			<p class="productName text-center">${name}</p>
			<div class="flex justify-center">
				<input
					id = ${index}
					class="productCount  w-10 text-center border border-black rounded-xl"
					type="number"
					value=${count}
				/>
			</div>
		</div>
		<div class="eachPrice w-[60%] text-center my-auto">${price * count}원</div>
		`,
		);
	});
	selectAll();
	removeChecked();
	changeItemNum();
	showPayInfo();
};

loadCartList();
