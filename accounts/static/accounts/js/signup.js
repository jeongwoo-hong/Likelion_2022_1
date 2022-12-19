const signupForm = document.getElementById('signup-form');

signupForm.onsubmit = (e) => handleSignup(e);

const handleSignup = (e) => {
  e.preventDefault();
  username = getUsername();
  passwords = getPasswords();

  console.log(
    `사용자 이름 : ${username}, 비밀번호: ${passwords[0]}, 비밀번호 확인: ${passwords[1]}`
  );

  if (validateUsername(username) && validatePassword(passwords)) {
    console.log('Valid signup form!');
    submitTarget(e);
  } else {
    console.log('Invalid signup form!');
    dismissSignup();
  }
};

const getUsername = () => {
  return document.querySelector('input[name=username]').value;
};

const validateUsername = (username) => {
  return username !== '';
};

const getPasswords = () => {
  return [...document.querySelectorAll('input[type=password]')].map(
    (input) => input.value
  );
};

const isSamePassword = ([pw1, pw2]) => {
  return pw1 === pw2;
};

const validatePassword = (passwords) => {
  return isSamePassword(passwords) && isValidFormatPassword(passwords);
};

const isValidFormatPassword = ([pw]) => {
  const regExp = /^[A-Za-z0-9]{3,}$/;

  return regExp.test(pw);
};

const submitTarget = (e) => {
  e.target.submit();
};

const dismissSignup = () => {
  showErrorModal();
  setGrayBackgroundColor();
  disableInputTags();
};

const errorModal = document.getElementById('signup-error-modal');
const showErrorModal = () => {
  errorModal.classList.add('show');
};

const modalCloseBtn = document.querySelector('.modal-header > .close-button');
modalCloseBtn.onclick = () => handleClose();

const handleClose = () => {
  hideErrorModal();
  resetGrayBackgroundColor();
  enableInputTags();
};

const hideErrorModal = () => {
  errorModal.classList.remove('show');
};

const bodyTag = document.querySelector('body');

const setGrayBackgroundColor = () => {
  bodyTag.classList.add('gray');
};

const resetGrayBackgroundColor = () => {
  bodyTag.classList.remove('gray');
};

const inputTags = [...document.querySelectorAll('input')];

const disableInputTags = () => {
  inputTags.forEach((inputTag) => (inputTag.disabled = true));
};

const enableInputTags = () => {
  inputTags.forEach((inputTags) => (inputTags.disabled = false));
};
