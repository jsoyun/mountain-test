const $nick = document.getElementById('nick');
const $nickCheck = document.querySelector('.nick-check');

/* 닉네임 문구 표기 */
$nick.addEventListener('input', () => {
  let checkName = /^[가-힣a-zA-Z]+$/;
  let result = checkName.exec($nick.value);

  if (result != null) {
    $nickCheck.innerHTML = '';
  } else {
    $nickCheck.innerHTML = "한글/영어만 입력 가능합니다.";
  }
});

const $email = document.getElementById('email');
const $emailCheck = document.querySelector('.email-check');

/* 이메일 문구 표기 */
$email.addEventListener('input', () => {
  let checkName = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  let result = checkName.exec($email.value);

  if (result != null) {
    $emailCheck.innerHTML = '';
  } else {
    $emailCheck.innerHTML = "올바른 이메일 형식이 아닙니다.";
  }
});

const $pwd = document.getElementById('pwd');
const $pwdCheck = document.querySelector('.pwd-check');

/* 비밀번호 문구 표기 */
$pwd.addEventListener('input', () => {
  let checkName = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  let result = checkName.exec($pwd.value);

  if (result != null) {
    $pwdCheck.innerHTML = '';
  } else {
    $pwdCheck.innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
  }
});

const $pwdCh = document.getElementById('pwdcheck');
const $pwdCheckCheck = document.querySelector('.pwdcheck-check');

/* 비밀번호 확인 문구 표기 */
$pwdCh.addEventListener('input', () => {
  if ($pwd.value == $pwdCh.value) {
    $pwdCheckCheck.innerHTML = '';
  } else {
    $pwdCheckCheck.innerHTML = "비밀번호가 일치하지않습니다.";
  }
});
