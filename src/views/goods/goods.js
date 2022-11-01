//요소 모음
const option_list = document.getElementById('option_list');
const searchBtn = document.querySelector('.search-btn');
const filter_options = document.querySelectorAll('.filter-option');

//이벤트추가
filter_options.forEach((a) => {
  a.addEventListener('change', addOption);
});
searchBtn.addEventListener('click', searchGoods);

const filter_option = {
  free_delivery: false,
  color_white: false,
  color_gray: false,
  color_black: false,
  color_chromatic: false,
  under_10000: false,
  over_10000: false,
  over_20000: false,
};
//필터옵션은 리스트에 담아서
//체크된 옵션은 true, 아니면 false로 하는 방법도 있음

//이벤트리스너 함수
function addOption(e) {
  console.log(e.target);
  if (e.target.checked) {
    option_list.insertAdjacentHTML(
      'beforeend',
      `
        <li class="mx-2 ${e.target.value} "><label for=${e.target.value}  class="bg-gray-400 rounded-lg text-xs p-1">${e.target.value}</label> <button id=${e.target.value} >x</button></li>
      `
    );
  } else {
    // option_list.insertAdjacentHTML(
    //   'beforeend',
    //   `
    //     <li class=`mx-2 `><label class="bg-gray-400 rounded-lg text-xs p-1">${e.target.value}</label> <button id=${e.target.innerText} >x</button></li>
    //   `
    // );
  }
  console.log(e.target.value);
}

async function searchGoods(e) {
  e.preventDefault();
}
