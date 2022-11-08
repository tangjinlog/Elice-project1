import { navTemplate } from '/common/nav.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();
//요소 모음
const option_list = document.getElementById('option_list');
const searchBtn = document.querySelector('.search-btn');
const filter_options = document.querySelectorAll('.filter-option');

//이벤트추가
filter_options.forEach((inputValue) => {
	inputValue.addEventListener('change', addOption);
});
searchBtn.addEventListener('click', searchGoods);

const filter_option = [];
//필터옵션은 리스트에 담아서
//체크된 옵션은 true, 아니면 false로 하는 방법도 있음

//이벤트리스너 함수
function addOption(e) {
	console.log(e.target);
	if (e.target.checked) {
		option_list.insertAdjacentHTML(
			'beforeend',
			`
        <li class="mx-2 ${e.target.value} "><label for=${e.target.value}  class="bg-gray-400 rounded-lg text-xs p-1">${e.target.value}</label> <button id=${e.target.value} >x</button></li>
      `,
		);
	} else {
		// option_list.insertAdjacentHTML(
		//   'beforeend',
		//   `
		//     <li class=`mx-2 `><label class="bg-gray-400 rounded-lg text-xs p-1">${e.target.value}</label> <button id=${e.target.innerText} >x</button></li>
		//   `
		// );
	}
	console.log(e.target.value);
}

async function searchGoods(e) {
	e.preventDefault();
}

/* product template */
function productTemplate(image, name, price) {
	return `
    <div class="productItem flex-col w-full h-full bg-slate-200">
      <div class="grow w-full">
          <img class="image" src="${image}" alt="상품이미지">
      </div>
      <p class="name">${name}</p>
      <div>
        <span class="price">${price}원</span>
      </div>
    </div>
  `;
}

async function productAll() {
	const response = await fetch('/api/productlist');
	const result = await response.json();
	const productCon = document.querySelector('.productCon');
	console.log(result);

	result.map((e) => {
		const name = e.name;
		const price = e.price;
		const image = e.image ? e.image : '../images/no-image.png';
		const productItem = productTemplate(image, name, price);
		let detailArr = [];

		productCon.innerHTML += productItem;

		const images = document.querySelectorAll('.image');
		images.forEach((e) => {
			e.addEventListener('click', (e) => {
				const image = e.target.src;
				console.log(e.target);
				const name = e.target.parentNode.nextElementSibling.innerText;
				const price = parseInt(
					e.target.parentElement.nextElementSibling.nextElementSibling
						.firstElementChild.innerText,
				);
				console.log(image, name, price);
				const details = { image, name, price };
				detailArr.push(details);
				const value = JSON.stringify(detailArr);
				window.localStorage.setItem('details', value);
			});
		});
	});
}

productAll();
