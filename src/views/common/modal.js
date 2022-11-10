/* 참조 함수 */
const $ = (selector) => document.querySelector(selector);

/* 모달창 생성 */
export async function createModal(modal) {
	const modalEl = document.createElement('div');
	modalEl.setAttribute('class', 'modalCon');
	modalEl.innerHTML = modal;
	document.querySelector('body').prepend(modalEl);

	const yesBtn = document.getElementById('yesBtn');
	const noBtn = document.getElementById('noBtn');
	const closeBtn = $('.closeBtn');
	/* 지연 닫기 */
	yesBtn.addEventListener('click', () => {
		closeModal;
	});
	noBtn?.addEventListener('click', (e) => {
		closeModal();
		e.preventDefault();
	});
	/* x 버튼 클릭시 닫기 */
	closeBtn.addEventListener('click', closeModal);

	/* 모달창 외에 배경을 클릭하면 닫기 */
	modalEl.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('modalBackground')) {
			closeModal(e);
		}
	});

	/* 모달창 닫기 */
	function closeModal(e) {
		const modalEl = $('.modalCon');
		const body = $('body');
		body.removeChild(modalEl);
	}
}
