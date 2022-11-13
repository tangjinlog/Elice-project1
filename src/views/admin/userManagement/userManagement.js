import { navTemplate } from '/common/nav.js';
import { createModal } from '/common/modal.js';
import { quest } from '/common/quest.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();
/* 참조함수 */
const $ = (selector) => document.querySelector(selector);

/* 유저리스트 템플릿 */
const userListTemplate = () => {
	return `
  <div class="userList flex justify-around">
    <div class="w-1/6 py-3">${date}</div>
    <div class="w-1/6 py-3">${email}</div>
    <div class="w-1/6 py-3">${name}</div>
    <div class="w-1/6 py-3">${auth}</div>
    <div class="userDelete w-1/6 h-full py-3 bg-red-300 my-3 rounded">
      <a href="#" class="whitespace-nowrap">회원정보삭제</a>
    </div>
  </div>`;
};

/* modal */
const modal = `
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

/* 전체 유저목록 조회 */
async function allUserList() {
	const response = await fetch('/api/userlist', {
		headers: {
			authorization: `bearer ${token}`,
		},
	});
	const result = await response.json();
	console.log(result);
	result.forEach((elem) => {
		const userListCon = $('.userListCon');
		const id = elem._id;
		// const auth =
		userListCon.innerHTML += userListTemplate();

		deleteElem();
	});
}

/* 버튼 연결 */

console.log(userDeleteBtn);
const userDeleteBtn = $('.userDelete');
userDeleteBtn.addEventListener('click', (e) => {
	createModal(modal);
	const eTarget = e;
	const yesBtn = $('#yesBtn');
	yesBtn.addEventListener('click', (e) => {
		const deleteElem = quest(eTarget, 'userList');
		const modalEl = $('.modalCon');
		const body = $('body');
		body.removeChild(modalEl);
		deleteElem.remove();
	});
});

allUserList();
