//요소 모음
const option_list = document.getElementById('option_list');
const testCheck = document.querySelector('.test');
const freeDeli = document.querySelector('.free_deli');

//이벤트추가
testCheck.addEventListener('click', (e) => {
  alert('clicked');
});

freeDeli.addEventListener('click', addOption);

function addOption(e) {
  option_list.insertAdjacentHTML(
    'beforeend',
    `
      <li class="mx-2 "><span class="bg-gray-400 rounded-lg text-xs p-1">${e.target.innerText}</span> <button class="">삭제</button></li>
    `
  );
}
