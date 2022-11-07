// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '../api.js';
import { randomId } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const landingDiv = document.querySelector('#landingDiv');
const greetingDiv = document.querySelector('#greetingDiv');

// set the dropdown menu element
const targetEl = document.getElementById('dropdownMenu');

// set the element that trigger the dropdown menu on click
const triggerEl = document.getElementById('dropdownButton');

// options with default values
const options = {
	placement: 'bottom',
	onHide: () => {
		console.log('dropdown has been hidden');
	},
	onShow: () => {
		console.log('dropdown has been shown');
	},
};

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
	// insertTextToLanding();
	// insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
	landingDiv.addEventListener('click', alertLandingText);
	// greetingDiv.addEventListener("click", alertGreetingText);
}

// function insertTextToLanding() {
//   landingDiv.insertAdjacentHTML(
//     "beforeend",
//     `
//       <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
//     `
//   );
// }

// function insertTextToGreeting() {
//   greetingDiv.insertAdjacentHTML(
//     "beforeend",
//     `
//       <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
//     `
//   );
// }

function alertLandingText() {
	alert('n팀 쇼핑몰입니다. 안녕하세요.');
}

function alertGreetingText() {
	alert('n팀 쇼핑몰에 오신 것을 환영합니다');
}

async function getDataFromApi() {
	// 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
	const data = await Api.get('/api/user/data');
	const random = randomId();

	console.log({ data });
	console.log({ random });
}
const itemListCon = document.querySelector('.slider-con');
function sliderTemplate() {
	for (let i = 1; i < 5; i++) {
		itemListCon.innerHTML +=
			'' +
			`<ul class="w-[${6}00%] flex">
    <li class="slide w-full">
    <div class="img-box w-screen h-full">
    <a href="#" class="img h-full">
    <img class="h-full" src="../images/slider/제목 없음-${i}.png" alt="image-${i}">
    </a>
    </div>
    </li>
    </ul>`;
	}
}

function itemArrow() {
	// const leftArrow = document.querySelector('.arrow-left');
	// const rightArrow = document.querySelector('.arrow-right');
	let itemList = document.getElementsByClassName('slide');
	let cloneFirst = itemListCon.lastElementChild.cloneNode(true);
	let cloneLast = itemListCon.firstElementChild.cloneNode(true);

	itemListCon.insertBefore(cloneLast, itemListCon[0]);
	itemListCon.appendChild(cloneFirst);
	let index = 0;
	setInterval(() => {
		console.log('ha');
		if (index == 0) {
			index = 1;
			itemListCon.style.transition = `${0.5}s ease-out`;
		}
		console.log(index);
		itemListCon.style.marginLeft = `${-index * window.innerWidth}px`;
		index++;

		if (index == itemList.length) {
			index = 0;
			itemListCon.style.marginLeft = `${-index * window.innerWidth}px`;
			itemListCon.style.transition = `${0}s ease-out`;
		}
	}, 4000);
}
sliderTemplate();
itemArrow();
