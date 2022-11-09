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
	<div class="w-1/6 py-3">${name}</div>
	<div class="w-2/6 py-3">${description}</div>
	<div class="flex w-1/6">
		<div class="categoryDelete w-full px-2 py-2 mr-1 bg-red-300 rounded">
			<a href="#" class="block">삭제</a>
		</div>
		<div class="categoryDelete w-full px-2 py-2 bg-red-300 rounded">
			<a href="#" class="block">삭제</a>
		</div>
	</div>
	`;
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
		categoryForm.innerHTML = categoryTemplate(name, description);
	});
}

allCategories();
