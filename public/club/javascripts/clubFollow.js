//팔로우
document.querySelectorAll(".twit-follow").forEach(function (tag) {
  tag.addEventListener("click", function () {
    const myId = document.querySelector("#my-id");
    if (myId) {
      const userId = tag.parentNode.querySelector(".twit-user-id").value;
      if (userId !== myId.value) {
        if (confirm("팔로잉하시겠습니까?")) {
          axios
            .post(`/user/${userId}/follow`)
            .then(() => {
              location.reload();
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    }
  });
});
//팔로우끊기
document.querySelectorAll(".twit-unfollow").forEach(function (tag) {
  tag.addEventListener("click", function () {
    const myId = document.querySelector("#my-id");
    console.log(myId);
    if (myId) {
      const userId = tag.parentNode.querySelector(".twit-user-id").value;

      if (userId !== myId.value) {
        if (confirm("팔로잉끊으시겠습니까?")) {
          axios
            .post(`/user/${userId}/unfollow`)
            .then(() => {
              location.reload();
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    }
  });
});
