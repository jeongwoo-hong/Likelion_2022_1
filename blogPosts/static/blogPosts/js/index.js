// search related feature//
(() => {
  document.getElementById("search-btn").onclick = () => {
    doSearch();
  };
  document.getElementById("search-bar").onkeydown = (e) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };
  axios.get("https://api.thecatapi.com/v1/images/search")
    .then(function (response) {
      const url = response.data[0].url;
			const catImage = document.getElementById("cat-image");
			catImage.src = url;
    }).catch(function (error) {
      console.log(error);
    });
})();

const doSearch = () => {
  const searchKeyword = document.getElementById("search-bar").value;
  const posts = getAllPosts();

  resetPosts(posts);

  const unMatchedPosts = getUnMatchedPosts(posts, searchKeyword);

  hidePosts(unMatchedPosts);
};

const getAllPosts = () => {
  const posts = [...document.querySelectorAll(".post-container")];

  return posts.map((post) => ({
    postContainer: post,
    postTitle: post.querySelector(".post-container-title").textContent.trim(),
  }));
};

const getUnMatchedPosts = (posts, searchKeyword) => {
  return posts.filter((post) => !post.postTitle.includes(searchKeyword));
};

const hidePosts = (posts) => {
  return posts.forEach((post) => post.postContainer.classList.add("hide"));
};

const resetPosts = (posts) => {
  return posts.forEach((post) => post.postContainer.classList.remove("hide"));
};
//

const onClickLikeButton = (postId) => {
  axios.get(`/posts/${postId}/like/`);
  console.log("hihihi");
};
