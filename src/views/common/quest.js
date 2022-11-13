/**  탐색함수
인자: 이벤트객체, 상위탐색할 요소의 클래스네임, 하위탐색할 클래스네임
주의: 1.전달받은 이벤트객체는 모달창의 취소버튼이 아니라 요소의 취소버튼을 전달받아야 한다.
		2.탐색은 첫 번째 - 한방향으로만 진행됨 (하위탐색으로 들어갔다가 나오지 않음)
사용예시: 클릭버튼으로부터 원하는 부모의 태그까지 클래스이름으로 상위탐색 후,
      그 태그를 기준으로 원하는 하위태그까지 클래스이름으로 하위탐색함
*/

export function quest(e, parentClassName, childClassName = '') {
	let parentTag = e.target;
	let childTag;
	for (
		;
		parentTag.classList.contains(parentClassName) != true;
		parentTag = parentTag.parentElement
	) {}
	childTag = parentTag;
	if (childClassName != '') {
		for (
			let i = 0;
			childTag.classList.contains(childClassName) != true;
			childTag = childTag.children[i]
				? childTag.children[i]
				: childTag.nextElementSibling
		) {}
	}
	return childTag;
}
