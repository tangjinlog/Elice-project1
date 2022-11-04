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
          <button id="deleteYesBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 bg-slate-100">네</button>
          <button id="deleteNoBtn" class="inline-block w-20 h-10 px-3 py-2 mx-1 bg-lime-300 rounded">아니오</button>
        </div>
      </div>
    </div>
  </div>
`;

const userDeleteBtn = document.querySelector(".userDelete");
userDeleteBtn.addEventListener("click", createModal);

/* 모달창 생성 */
function createModal() {
  /* userDeleteBtn 전달 */
  const self = this;
  const modalEl = document.createElement("div");
  modalEl.setAttribute("class", "modalCon");
  modalEl.innerHTML = modal;
  document.querySelector("body").prepend(modalEl);

  const deleteYesBtn = document.getElementById("deleteYesBtn");
  const deleteNoBtn = document.getElementById("deleteNoBtn");
  const closeBtn = document.querySelector(".closeBtn");

  /* 즉시실행 방지 */
  deleteYesBtn.addEventListener("click", ()=> {
    cancelOrder(self)
  });
  deleteYesBtn.addEventListener("click", closeModal);
  deleteNoBtn.addEventListener("click", closeModal);
  /* x 버튼 클릭시 닫기 */
  closeBtn.addEventListener("click", closeModal);

  /* 모달창 외에 배경을 클릭하면 닫기 */
  modalEl.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("modalBackground")) {
      closeModal(e);
    }
  });
}
/* 모달창 닫기 */
function closeModal(e) {
  const modalEl = document.querySelector(".modalCon");
  const body = document.querySelector("body");
  body.removeChild(modalEl);
}

function cancelOrder(cancelBtn) {
  let parentTag = cancelBtn;
  for(; parentTag.classList.contains('orderList') != true; parentTag = parentTag.parentElement);
  parentTag.remove()
}