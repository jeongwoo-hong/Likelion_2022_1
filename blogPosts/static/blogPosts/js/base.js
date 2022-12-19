//footer related feature //
const copyrightTag = document.getElementById("copyright-text");
const footerSetYear = () => {
  const thisYear = new Date().getFullYear();
  copyrightTag.textContent = `SNU LIKELION ${thisYear}`;
};

(() => {
  footerSetYear();
})();

//logout related feature
(() => {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.onclick = (e) => handleLogout(e);
})();

(() => {
  const modalCancelBtn = document.querySelector(
    "#log-out-modal > .modal-footer > .cancel"
  );
  modalCancelBtn.onclick = () => handleCancel();
})();

(() => {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.onclick = (e) => handleLogout(e);
})();

const logoutModal = document.getElementById("log-out-modal");

const handleLogout = (e) => {
  e.preventDefault();
  showModal();

  const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts")) || [];
  const modalContent = document.querySelector(
    "#log-out-modal > .modal-content"
  );
  const hasLogoutModalOpened =
    modalContent.children.length === viewedPosts.length;

  if (!hasLogoutModalOpened) {
    setViewedPostCount(viewedPosts);
    showViewedPostTitle(viewedPosts);
  }
};

const showModal = () => {
  logoutModal.classList.add("show");
};

(() => {
  const modalCancelBtn = document.querySelector(
    "#log-out-modal > .modal-footer > .cancel"
  );
  modalCancelBtn.onclick = () => handleCancel();

  const modalLogoutBtn = document.querySelector(
    "#log-out-modal > .modal-footer > .confirm"
  );
  modalLogoutBtn.onclick = () => handleModalLogout();
})();

const handleCancel = () => {
  hideModal();
};

const handleModalLogout = () => {
  const redirectUrl = getRedirectUrl();
  moveToUrl(redirectUrl);
  localStorage.removeItem("viewedPosts");
};

const getRedirectUrl = () => {
  return document.getElementById("logout").getAttribute("href");
};

const moveToUrl = (redirectUrl) => {
  window.location.href = redirectUrl;
};

const hideModal = () => {
  logoutModal.classList.remove("show");
};

const setViewedPostCount = (viewedPosts) => {
  document.querySelector(
    "#log-out-modal > .modal-header > .viewed-post-count"
  ).textContent = viewedPosts.length;
};

const showViewedPostTitle = (viewedPosts) => {
  const fragment = document.createDocumentFragment();

  viewedPosts.forEach(({ postTitle }) => {
    fragment.appendChild(
      makeElement(["li", "class", "viewed-post", postTitle])
    );
  });

  const modalContent = document.querySelector(
    "#log-out-modal > .modal-content"
  );
  modalContent.appendChild(fragment);
};

const makeElement = ([tagName, attribute, value, textContent]) => {
  const element = document.createElement(tagName || "li");
  element.setAttribute(attribute || "class", value || "");
  element.textContent = textContent || "";

  return element;
};