export function quest(target, parentClassName, childClassName) {
	let parentTag = target;
	let itemCon;
	for (
		;
		parentTag.classList.contains(parentClassName) != true;
		parentTag = parentTag.parentElement
	) {}
	itemCon = parentTag;
	for (
		let i = 0;
		itemCon.classList.contains(childClassName) != true;
		itemCon = itemCon.children[i]
			? itemCon.children[i]
			: itemCon.nextElementSibling
	) {}
	return itemCon;
}
