const onSetPostLikeCount = (likeCount) => {
  const postLikeCountOfUser = document.getElementById('user-like-count');
  postLikeCountOfUser.innerHTML = `내가 좋아한 글 : ${likeCount}개 `;
}

const onClickLikeButton = async (postId) => {
  const response = await axios.get(`/posts/${postId}/like/`);
  const postLikeButton = document.getElementById(`${postId}-like-button`);
  postLikeButton.innerHTML = `${response.data.postLikeCount} likes`;
  onSetPostLikeCount(response.data.userLikeCount);
};

const getTagElement = (tagContent, tagId) => {
  const newTagElement = document.createElement("a");
  newTagElement.setAttribute("href", `/tags/${tagId}/`);
  newTagElement.innerHTML = tagContent;
  return newTagElement;
};

const onAddTag = async () => {
  const tagInputElement = document.getElementById("tag-input");

  if (tagInputElement.value) {
    const data = new FormData();
    data.append("content", tagInputElement.value);

    const response = await axios.post(`/tags/new/`, data);
    const tagElement = getTagElement(tagInputElement.value, response.data.tagId);

    document.getElementById("tag-list").appendChild(tagElement);
    tagInputElement.value = "";
  }
};

const onDeletePost = async (postId) => {
  const postElement = document.getElementById(`post-${postId}`);

  if (confirm("정말 삭제하시겠습니까?")) {
    const response = await axios.delete(`/posts/${postId}/delete/`);
    postElement.remove();
    onSetPostLikeCount(response.data.postLikeCount);
  }
};
