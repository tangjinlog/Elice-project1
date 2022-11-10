import { navTemplate } from '/common/nav.js';
import { createModal } from '/common/modal.js';
import { quest } from '/common/quest.js';
/* 참조 함수 */
const $ = (selector) => document.querySelector(selector);

/* nav Template */
function addNav() {
	const header = $('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

/* 카테고리 템플릿 */
const categoryTemplate = (id, name, description) => {
	return `
	<div class="itemCon flex justify-around items-center w-full hover:-translate-y-0.5 transition hover:bg-slate-100 shadow">
		<div class="name w-1/6 py-3 ">${name}</div>
		<div class="desc w-2/6 py-3">${description}</div>
	<div class="flex w-1/6">
		<div class="w-full h-full px-2 py-2 mr-1 hover:bg-slate-400 bg-slate-300 rounded">
			<button id="${id}" class="categoryUpdate inline-block">수정</button>
		</div>
		<div class="w-full px-2 py-2 hover:bg-red-400 bg-red-300 rounded">
			<button id="${id}" class="categoryDelete inline-block">삭제</button>
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
		const id = e._id;
		const name = e.name;
		const description = e.description;
		categoryForm.innerHTML += categoryTemplate(id, name, description);

		/* 카테고리 업데이트 */
		updateElem(result);
		deleteElem(result);
	});
}

/* modal */
const modal = `
	<div class="modalBackground flex justify-center items-center absolute z-10 w-full h-full inset-0 bg-black/[0.25]">
		<div class="modalClose fixed top-10 right-10 text-3xl">
			<i class="closeBtn fa-solid fa-x"></i>
		</div>
		<form action="/api/category" method="post" class="modalWindow justify-around relative z-10 w-90 h-auto bg-white px-10 py-6 -top-10 rounded">
			<div class="flex-col items-center h-full">
				<label for="titleInput" class="font-bold">카테고리 이름</label>
				<div>
					<input type="text" id="titleInput" class="border rounded p-2 mt-2 mb-4 w-full" name="name"/>
				</div>
				<label for="desInput" class="font-bold">카테고리 설명</label>
				<div>
					<input type="text" id="desInput" class="border rounded p-2 mt-2 mb-4 w-full" name="description"/>
				</div>
			</div>
			<div class="flex justify-center">
				<button id="yesBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 hover:bg-lime-400 bg-lime-200 rounded">확인</button>
				<button id="noBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 hover:bg-slate-400 bg-slate-200 rounded">취소</button>
			</div>	
		</form>
	</div>`;

const updateModal = (name, desc) => {
	return `<div class="modalBackground flex justify-center items-center absolute z-10 w-full h-full inset-0 bg-black/[0.25]">
			<div class="modalClose fixed top-10 right-10 text-3xl">
				<i class="closeBtn fa-solid fa-x"></i>
			</div>
			<form action="" class="modalWindow justify-around relative z-1 w-90 h-auto bg-white px-10 py-6 -top-10 rounded">
				<div class="flex-col items-center h-full">
					<label for="nameInput" class="font-bold">카테고리 이름</label>
					<div>
						<input type="text" value="${name}" id="nameInput" class="border rounded p-2 mt-2 mb-4 w-full" name="name"/>
					</div>
					<label for="desInput" class="font-bold">카테고리 설명</label>
					<div>
						<input type="text" value="${desc}" id="descInput" class="border rounded p-2 mt-2 mb-4 w-full" name="description"/>
					</div>
				</div>
				<div class="flex justify-center">
					<button id="yesBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 hover:bg-lime-400 bg-lime-200 rounded">확인</button>
					<button id="noBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 hover:bg-slate-400 bg-slate-200 rounded">취소</button>
				</div>	
			</form>
		</div>`;
};

const deleteModal = () => {
	return `
  <div class="modalBackground flex justify-center items-center absolute z-10 w-full h-full inset-0 bg-black/[0.25]">
    <div class="modalClose fixed top-10 right-10 text-3xl">
      <i class="closeBtn fa-solid fa-x"></i>
    </div>
    <div class="modalWindow justify-around relative z-10 w-90 h-40 bg-white px-10 py-6 -top-10 rounded">
      <div class="flex-col items-center h-full">
        <p class="">카테고리 삭제 시 복구할 수 없습니다. 정말로 삭제하시겠습니까?</p>
        <div class="modalBtn flex justify-center items-center h-full">
          <button id="yesBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 bg-slate-100 rounded">네</button>
          <button id="noBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 bg-lime-300 rounded">아니오</button>
        </div>
      </div>
    </div>
  </div>`;
};

/* 버튼연결 */
const createBtn = $('.category-createBtn');
createBtn.addEventListener('click', () => {
	createModal(modal);
});
/* 카테고리 수정 */
const updateElem = async (result) => {
	const updateBtn = document.querySelectorAll('.categoryUpdate');
	updateBtn.forEach((elem) => {
		elem.addEventListener('click', (e) => {
			e.preventDefault();
			/* category description */
			const target = result.filter((item) => item._id == e.target.id);
			const id = target[0]._id;
			const name = target[0].name;
			const desc = target[0].description;
			/* update 모달생성 */
			createModal(updateModal(name, desc));
			const yesBtn = $('#yesBtn');
			/* update 요청 */
			yesBtn.addEventListener('click', (e) => {
				const updateDesc = $('#descInput').value;
				const updateName = $('#nameInput').value;
				updateCategory({ description: updateDesc, name: updateName }, id);
			});
		});
	});
};

const deleteElem = async (result) => {
	const deleteBtn = document.querySelectorAll('.categoryDelete');
	deleteBtn.forEach((elem) => {
		elem.addEventListener('click', (e) => {
			e.preventDefault();

			/* category description */
			const target = result.filter((item) => item._id == e.target.id);
			const eTarget = e.target;
			const id = target[0]._id;
			/* delete 모달생성 */
			createModal(deleteModal);
			const yesBtn = $('#yesBtn');
			/* delete 요청 */
			yesBtn.addEventListener('click', () => {
				/* 상위탐색 */
				const deleteElem = quest(eTarget, 'itemCon');
				const modalEl = $('.modalCon');
				const body = $('body');
				deleteElem.remove();
				body.removeChild(modalEl);
				deleteCategory(id);
			});
		});
	});
};

/* update fetch */
async function updateCategory(data, id) {
	await fetch(`/api/category/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}
/* delete fetch */
async function deleteCategory(id) {
	await fetch(`/api/category/${id}`, {
		method: 'DELETE',
		headers: {},
		body: '',
	});
}

allCategories();
