/* 탐색함수
인자: e.target , 상위탐색할 요소의 클래스네임, 하위탐색할 클래스네임
주의: 탐색은 첫 번째 - 한방향으로만 진행됨 (하위탐색으로 들어갔다가 나오지 않음)
사용예시: 클릭버튼으로부터 원하는 부모의 태그까지 클래스이름으로 상위탐색 후,
      그 태그를 기준으로 원하는 하위태그까지 클래스이름으로 하위탐색함
*/

export function quest(target, parentClassName, childClassName = '') {
	let parentTag = target;
	let itemCon;
	for (
		;
		parentTag.classList.contains(parentClassName) != true;
		parentTag = parentTag.parentElement
	) {}
	itemCon = parentTag;
	if (childClassName != '') {
		for (
			let i = 0;
			itemCon.classList.contains(childClassName) != true;
			itemCon = itemCon.children[i]
				? itemCon.children[i]
				: itemCon.nextElementSibling
		) {}
	}
	return itemCon;
}
