const keywordCon = document.querySelector(".addKeyword");
const addBtn = document.querySelector('.addKeywordBtn');
const input = document.querySelector('.imgInput');

/* image upload */
function imgPathDisplay() {
  const preview = document.querySelector(".imgPath");
  const curFiles = input.files;
  console.log(curFiles)
  /* 업로드 클릭시 초기화 */
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = '파일이 없습니다. 파일을 추가해주세요.';
  } else {
    const list = document.createElement('ol');
    list.setAttribute('class', 'inline-block')
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      para.textContent = `${file.name}`
      listItem.appendChild(para);
      list.appendChild(listItem);
    }
  }
}








input.addEventListener('change', imgPathDisplay);
addBtn.addEventListener('click', addKeyword);

function addKeyword(e) {
  /* 자동이동방지 */
  e.preventDefault();
  let keywordInput = document.querySelector(".keywordInput");
  const value = keywordInput.value;
  /* keyword 템플릿 */
  const keyword = `
    <div class='item'>
      <div class="flex bg-neutral-200/[0.55] rounded-lg mr-2">
        <span class="px-2">${value}</span>
        <span class="px-2"><i class='deleteIcon fa fa-times'></i></span>
      </div>
    </div>
  `;
  if (value !== "") {
    keywordCon.innerHTML += keyword;
  }
  keywordInput.value = '';
  const deleteIcon = document.querySelectorAll(".deleteIcon");
  deleteIcon.forEach(e=>e.addEventListener('click', deleteKeyword))
}

/* 키워드삭제 */
function deleteKeyword(e) {
  this.parentNode.parentNode.parentNode.remove()
}
