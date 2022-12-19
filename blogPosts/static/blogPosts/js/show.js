const saveHistory = () => {
  const viewedPosts = getHistory();
  
  const element = document.getElementById("post-title");
  console.log(element);
  const postId = element.dataset.postId;
  const postTitle = element.textContent;

  if (!isDuplicate(viewedPosts, postId)) {
    localStorage.setItem(
      "viewedPosts",
      JSON.stringify([{ postId, postTitle }, ...viewedPosts])
    );
  }
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("viewedPosts")) || [];
};

const isDuplicate = (viewedPosts, selectedPostId) => {
  return viewedPosts.some((post) => post.postId === selectedPostId);
};

(() => {
  saveHistory();
})();
