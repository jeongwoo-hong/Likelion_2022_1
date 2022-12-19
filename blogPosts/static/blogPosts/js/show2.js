const onSetPostLikeCount = async (likeCount) => {
  const postLikeCountOfUser = document.getElementById('user-like-count');
  postLikeCountOfUser.innerHTML = `내가 좋아한 글 : ${likeCount}개 `;
}

const onSetCommentCount = (commentCount) => {
  const commentCountElement = document.getElementById('comment-count');
  commentCountElement.innerHTML = `<strong>댓글이 ${commentCount}개 있습니다</strong>`;
}

const onClickShowLikeButton = async (postId) => {
  const showPostLikeButton = document.getElementById(`${postId}-show-like-button`);
  const response = await axios.get(`/posts/${postId}/like/`);
  showPostLikeButton.innerHTML = `${response.data.postLikeCount} Likes`;
  onSetPostLikeCount(response.data.userLikeCount);
};

const onClickCommentLikeButton = async (commentId) => {
  const commentLikeButton = document.getElementById(`${commentId}-comment-like-button`);
  const response = await axios.get(`/posts/${commentId}/commentlike/`);
  commentLikeButton.innerHTML = `${response.data.commentLikeCount} Likes`;
};

const getCommentElement = (postId, commentId, commentContent, commentAuthor, commentCreatedAt, commentLikeCount) => {
  const newCommentElement = document.createElement("p");
  newCommentElement.setAttribute('id', `post-${postId}-comment-${commentId}`);
  newCommentElement.innerHTML = `${commentAuthor}: ${commentContent}&nbsp; &nbsp; ${commentCreatedAt}
                                <a id="${commentId}-comment-like-button" onclick="onClickCommentLikeButton(${commentId})">
                                  ${commentLikeCount} Likes 
                                </a>
                                <a onclick="onDeleteComment(${postId}, ${commentId})">댓글 삭제</a>`
  return newCommentElement;
};

const onAddComment = async (postId) => {
  const commentInputElement = document.getElementById("comment-input");

  if (commentInputElement.value) {
    const data = new FormData();
    data.append("content", commentInputElement.value);
    data.append("postId", postId);

    const response = await axios.post(`/posts/${postId}/comments/`, data);
    const { commentId, commentAuthor, commentCreatedAt, commentLikeCount, commentCount } = response.data;
    const commentElement = getCommentElement(postId, commentId, commentInputElement.value, commentAuthor, commentCreatedAt, commentLikeCount);

    document.getElementById("comment-list").appendChild(commentElement);
    onSetCommentCount(commentCount);
    commentInputElement.value = "";
  }
};

const onDeleteComment = async (postId, commentId) => {
  const commentElement = document.getElementById(`post-${postId}-comment-${commentId}`);

  if (confirm("댓글을 정말 삭제하시겠습니까?")) {
    const response = await axios.delete(`/posts/${postId}/comments/${commentId}/`);
    const { commentCount } = response.data;
    onSetCommentCount(commentCount);
    commentElement.remove();
  }
};
