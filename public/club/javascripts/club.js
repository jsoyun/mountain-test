const tagContainer = document.querySelector(".tag-container");

const input = document.querySelector(".tag-container input");

const tags = [];

function createTag(label) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  const p = document.createElement("p");
  p.innerHTML = label;
  const closeBtn = document.createElement("span");
  closeBtn.setAttribute("class", "material-icons");
  closeBtn.setAttribute("data-item", label);
  closeBtn.innerHTML = "close";

  div.appendChild(p);
  div.appendChild(closeBtn);
  return div;
}

function reset() {
  document.querySelectorAll(".tag").forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  reset();
  tags
    .slice()
    .reverse()
    .forEach(function (tag) {
      const input = createTag(tag);
      tagContainer.prepend(input);
    });
}

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const tag = createTag(input.value);
    tags.push(input.value);
    addTags();
    tagContainer.prepend(tag);

    input.value = "";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.tagName === "I") {
    const value = e.target.getAttribute("data-item");
    console.log(value);
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    console.log(tags);
    addTags();
  }
});
