const agreeChkAll = document.querySelector('input[name=agree-all]');
let agree1 = document.getElementById('agree1');
let agree2 = document.getElementById('agree2');

/* 동의 모두선택 / 해제 */
agreeChkAll.addEventListener('change', (e) => {
  let agreeChk = document.querySelectorAll('input[name=agree]');
  for(let i = 0; i < agreeChk.length; i++){
    agreeChk[i].checked = e.target.checked;
  }
});