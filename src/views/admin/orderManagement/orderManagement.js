import { navTemplate } from '/common/nav.js';
import { createModal } from '/common/modal.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

/* 참조함수 */
const $ = (selector) => document.querySelector(selector);

/* modal */
const modal = `
  <div class="modalBackground flex justify-center items-center absolute w-full h-full inset-0 bg-black/[0.25]">
    <div class="modalClose fixed top-10 right-10 text-3xl">
      <i class="closeBtn fa-solid fa-x"></i>
    </div>
    <div class="modalWindow justify-around relative w-90 h-40 bg-white px-10 py-6 -top-10 rounded">
      <div class="flex-col items-center h-full">
        <p class="">회원정보 삭제 시 복구할 수 없습니다. 정말로 삭제하시겠습니까?</p>
        <div class="modalBtn flex justify-center items-center h-full">
          <button id="yesBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 bg-slate-100 rounded">네</button>
          <button id="noBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 bg-lime-300 rounded">아니오</button>
        </div>
      </div>
    </div>
  </div>
`;

const userDeleteBtn = document.querySelector('.userDelete');
userDeleteBtn.addEventListener('click', () => {
	createModal(modal);
});
