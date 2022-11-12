import { navTemplate } from '/common/nav.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

const itemListCon = document.querySelector('.slider-con');
function sliderTemplate() {
	for (let i = 1; i < 6; i++) {
		itemListCon.innerHTML +=
			'' +
			`<ul class="w-[${7}00%] flex">
    <li class="slide w-full flex">
    <div class="img-box w-screen h-full mx-auto">
    <img class="mx-auto h-full" src="../images/slider/slide${i}.png" alt="image-${i}">
    </a>
    </div>
    </li>
    </ul>`;
	}
}

function itemArrow() {
	let itemList = document.getElementsByClassName('slide');
	let cloneFirst = itemListCon.lastElementChild.cloneNode(true);
	let cloneLast = itemListCon.firstElementChild.cloneNode(true);

	itemListCon.insertBefore(cloneLast, itemListCon[0]);
	itemListCon.appendChild(cloneFirst);
	let index = 0;
	setInterval(() => {
		if (index == 0) {
			index = 1;
			itemListCon.style.transition = `${0.5}s ease-out`;
		}
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
