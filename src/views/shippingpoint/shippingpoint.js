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

const store = window.localStorage;
const checkedProducts = JSON.parse(store.getItem('cart')).filter(
	(product) => product.checked == true,
);
console.log(JSON.parse(store.getItem('cart')));
console.log(checkedProducts);

function sendPost(url, params) {
	var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('target', '_blank');
	form.setAttribute('action', url);
	document.characterSet = 'UTF-8';

	for (var key in params) {
		var hiddenField = document.createElement('input');
		hiddenField.setAttribute('type', 'hidden');
		hiddenField.setAttribute('name', key);
		hiddenField.setAttribute('value', params[key]);
		form.appendChild(hiddenField);
	}

	document.body.appendChild(form);
	form.submit();
}
