import { navTemplate } from '/common/nav.js';

/* 참조 함수 */
const $ = (selector) => document.querySelector(selector);

/* nav Template */
function addNav() {
	const header = $('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

/* 카테고리 템플릿 */
const categoryTemplate = (name, description) => {
	return `
	<div class="flex justify-around items-center w-full">
	<div class="w-1/6 py-3">${name}</div>
	<div class="w-2/6 py-3">${description}</div>
	<div class="flex w-1/6">
		<div class="categoryDelete w-full h-full px-2 py-2 mr-1 hover:bg-slate-400 bg-slate-300 rounded">
			<a href="#" class="block">수정</a>
		</div>
		<div class="categoryDelete w-full px-2 py-2 hover:bg-red-400 bg-red-300 rounded">
			<a href="#" class="block">삭제</a>
		</div>
	</div>
	</div>`;
};

/* 카테고리 전체목록 */
async function allCategories() {
	const response = await fetch('/api/categories');
	const result = await response.json();
	console.log(result);
	result.forEach((e) => {
		const categoryForm = $('.categoryForm');
		const name = e.name;
		const description = e.description;
		categoryForm.innerHTML += categoryTemplate(name, description);
	});
}

allCategories();

/* modal msg */
let msg = '';

/* modal */
const modal = `
	<div class="modalBackground flex justify-center items-center absolute w-full h-full inset-0 bg-black/[0.25]">
	<div class="modalClose fixed top-10 right-10 text-3xl">
	<i class="closeBtn fa-solid fa-x"></i>
	</div>
	<form action="/api/category" method="post" class="modalWindow justify-around relative w-90 h-auto bg-white px-10 py-6 -top-10 rounded">
	<div class="flex-col items-center h-full">
	<label for="titleInput" class="font-bold">카테고리 이름</label>
	<div>
	<input type="text" id="titleInput" class="border rounded p-2 mt-2 mb-4 w-full" name="name"/>
	<label for="desInput" class="font-bold">카테고리 설명</label>
	<div>
	<input type="text" id="desInput" class="border rounded p-2 mt-2 mb-4 w-full" name="description"/>
	</div>
	<p class="">${msg}</p>
	// 
	
	
	</div>
	<button type="submit" id="YesBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 hover:bg-lime-400 bg-slate-100 rounded">확인</button>
	</form>
	</div>`;
{
	/* <div class="modalBtn flex justify-center items-center h-full"></div> */
}
/* 버튼연결 */
const createBtn = $('.category-createBtn');
createBtn.addEventListener('click', () => {
	createModal(modal);
});

/* 모달창 생성 */
async function createModal(modal) {
	const modalEl = document.createElement('div');
	modalEl.setAttribute('class', 'modalCon');
	modalEl.innerHTML = modal;
	document.querySelector('body').prepend(modalEl);

	const YesBtn = document.getElementById('YesBtn');
	const NoBtn = document.getElementById('NoBtn');
	const closeBtn = $('.closeBtn');

	const modalWindow = $('modalwindow');
	modalWindow.addEventListener('submit', () => {
		YesBtn.addEventListener('click', closeModal);
	});
	NoBtn?.addEventListener('click', closeModal);
	/* x 버튼 클릭시 닫기 */
	closeBtn.addEventListener('click', closeModal);

	/* 모달창 외에 배경을 클릭하면 닫기 */
	modalEl.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('modalBackground')) {
			closeModal(e);
		}
	});
}
/* 모달창 닫기 */
function closeModal(e) {
	const modalEl = $('.modalCon');
	const body = $('body');
	body.removeChild(modalEl);
}

// function cancelElem(cancelBtn) {
// 	let parentTag = cancelBtn;
// 	for (
// 		;
// 		parentTag.classList.contains('orderList') != true;
// 		parentTag = parentTag.parentElement
// 	);
// 	parentTag.remove();
// }
