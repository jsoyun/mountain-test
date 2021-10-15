clubDetail();
async function clubDetail() {
  try {
    const rawdata = await axios.get("/clubdetail/comment");
    const clubdata = await rawdata.data;
    const listbody = document.querySelector("#club-list");
    listbody.innerHTML = "";

    clubdata.map(async function (club) {
      // 로우 셀 추가
      const clubTable = document.createElement("div");
      clubTable.setAttribute("class", "club-table");

      const clubContainer = document.createElement("div");
      clubContainer.setAttribute("class", "club-content-container");
      clubTable.appendChild(clubContainer);

      const userContainer = document.createElement("div");
      userContainer.setAttribute("class", "user-container");
      clubContainer.appendChild(userContainer);

      let row = document.createElement("img");
      row.setAttribute("class", "profile-img");
      row.setAttribute("src", `${club.User.img}`);
      userContainer.appendChild(row);

      row = document.createElement("div");
      row.setAttribute("class", "profile-name");
      row.textContent = club.User.nick;
      userContainer.appendChild(row);

      const imgSection = document.createElement("div");
      imgSection.setAttribute("class", "img-section");
      clubContainer.appendChild(imgSection);

      const img = document.createElement("img");
      img.setAttribute("src", `${club.img}`);
      imgSection.appendChild(img);

      row = document.createElement("div");
      row.setAttribute("class", "button-icons");
      clubContainer.appendChild(row);

      row = document.createElement("div");
      row.setAttribute("class", "star-box");
      row.textContent = club.star + "점";
      clubContainer.appendChild(row);

      row = document.createElement("div");
      row.setAttribute("class", "comment-box");
      row.textContent = club.content;
      clubContainer.appendChild(row);

      const commentsList = await club.ClubComments;

      commentsList.map(function (comment) {
        const comentsTable = document.createElement("div");
        comentsTable.setAttribute("class", "user-comment-table");

        let commentrow = document.createElement("div");
        commentrow.textContent = comment.User.nick;
        comentsTable.appendChild(commentrow);

        const editForm = document.createElement("form");
        editForm.addEventListener("submit", async (e) => {
          if (document.querySelector("#my-id") !== null) {
            e.preventDefault();
            const editid = comment.id;
            id = editid;
            comment = e.target.comment.value;
            editComment(id, comment);
          }
        });
        editForm.setAttribute("class", "edit-form");
        commentrow.appendChild(editForm);

        commentrow = document.createElement("input");
        commentrow.setAttribute("readonly", "");
        commentrow.setAttribute("type", "text");
        commentrow.setAttribute("name", "comment");
        commentrow.value = comment.comment;
        editForm.appendChild(commentrow);
        if (
          document.querySelector("#my-id") !== null &&
          document.querySelector("#my-id").value == comment.User.id
        ) {
          let commentEdit = document.createElement("button");
          commentEdit.setAttribute("type", "button");
          commentEdit.textContent = "수정";
          editForm.appendChild(commentEdit);
          commentEdit.addEventListener("click", async (e) => {
            try {
              const prevTag = e.target.previousSibling;
              e.target.setAttribute("hidden", "");
              prevTag.removeAttribute("readonly");
              let commentEditCheck = document.createElement("button");
              commentEditCheck.setAttribute("type", "submit");
              commentEditCheck.textContent = "수정확인";
              editForm.appendChild(commentEditCheck);

              commentEditCheck = document.createElement("button");
              commentEditCheck.setAttribute("type", "button");
              commentEditCheck.textContent = "취소";
              commentEditCheck.addEventListener("click", async (e) => {
                clubDetail();
              });
              editForm.appendChild(commentEditCheck);

              // await axios.patch(`/clubdetail/edit/${comment.id}`);
              // const editCommentInput = document.createElement('input');
              // editCommentInput.setAttribute("id", "edit-comment-input");
              // editCommentInput.textContent = "//////////////////////////////////////////"
              console.log(prevTag);
            } catch (err) {
              console.error(err);
            }
          });

          commentDelete = document.createElement("button");
          commentDelete.textContent = "삭제";
          editForm.appendChild(commentDelete);
          commentDelete.addEventListener("click", async () => {
            // 삭제 클릭 시
            try {
              await axios.delete(`/clubdetail/delete/${comment.id}`);
              clubDetail();
            } catch (err) {
              console.error(err);
            }
          });
        }

        clubTable.appendChild(comentsTable);
      });
      if (document.querySelector("#my-id") !== null) {
        const myId = document.querySelector("#my-id").value;
        row = document.createElement("div");
        // row.textContent = "//////댓글작성창을 아래에 넣는다//////";
        clubTable.appendChild(row);

        const inputForm = document.createElement("form");
        inputForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const clubId = club.id;
          const writerId = myId;
          const comment = e.target.comment.value;
          inputComment(clubId, writerId, comment);
          e.target.comment.value = "";
        });
        inputForm.setAttribute("class", "input-form");
        clubTable.appendChild(inputForm);

        let inputItem = document.createElement("input");
        inputItem.setAttribute("type", "text");
        inputItem.setAttribute("name", "comment");
        inputItem.placeholder = "댓글달기..";
        inputForm.appendChild(inputItem);

        let commentInputCheck = document.createElement("button");
        commentInputCheck.setAttribute("class", "input-button");
        commentInputCheck.setAttribute("type", "submit");
        commentInputCheck.textContent = "게시";
        inputForm.appendChild(commentInputCheck);

        commentInputCheck = document.createElement("button");
        commentInputCheck.setAttribute("type", "button");
        commentInputCheck.textContent = "취소";
        commentInputCheck.addEventListener("click", async (e) => {
          clubDetail();
        });
        inputForm.appendChild(commentInputCheck);
      }
      listbody.appendChild(clubTable);
    });
  } catch (err) {
    console.error(err);
  }
}

async function inputComment(clubId, writerId, comment) {
  console.log(clubId);
  clubId = clubId;
  writerId = writerId;
  comment = comment;
  try {
    await axios.post("/clubdetail", { clubId, writerId, comment });
    clubDetail();
  } catch (err) {
    console.error(err);
  }
}
async function editComment(id, comment) {
  id = id;
  comment = comment;
  try {
    await axios.patch("/clubdetail/commentedit", { id, comment });
    clubDetail();
  } catch (err) {
    console.error(err);
  }
}
