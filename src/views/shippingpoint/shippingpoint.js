import { navTemplate } from '/common/nav.js';
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate();
}
addNav();

const userRequestInput = document.querySelector('.userRequest');
const userWriteInput = document.querySelector('.userWrite');
userRequestInput.addEventListener('change', (e) => {
	if (e.target.value == 'userWrite') {
		userWriteInput.classList.remove('hidden');
	} else {
		userWriteInput.classList.add('hidden');
	}
});
