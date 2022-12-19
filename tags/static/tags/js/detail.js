const onEditTag = async (tagId) => {
  const tagInputElement = document.getElementById("tag-edit-input");

  if (tagInputElement.value) {
    const data = new FormData();
    data.append("content", tagInputElement.value);
    await axios.post(`/tags/${tagId}/update/`, data);

    const tagElement = document.getElementById("tag-element");
    tagElement.innerHTML = tagInputElement.value;
  }
};
