//요소 모음
const option_list = document.getElementById('option_list');
const testCheck = document.querySelector('.test');
const freeDeli = document.querySelector('.free_deli');
const searchBtn = document.querySelector('.search-btn');

//이벤트추가
freeDeli.addEventListener('click', addOption);
searchBtn.addEventListener('click', searchGoods);

//이벤트리스너 함수
function addOption(e) {
  option_list.insertAdjacentHTML(
    'beforeend',
    `
      <li class="mx-2 "><span class="bg-gray-400 rounded-lg text-xs p-1">${e.target.innerText}</span> <button class="">x</button></li>
    `
  );
}

async function searchGoods(e) {
  e.preventDefault();
}
