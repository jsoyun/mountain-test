if (document.querySelector("#comments-input-form") != null) {
    const postId = document.querySelector(".contents-id").textContent;
    postComments(postId);
    document.querySelector("#comments-input-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const commenterId = document.querySelector("#my-id").value;
            const comment = await e.target.comment.value
            if (comment == null || comment == "") {
                document.querySelector("#comments-input").setAttribute("placeholder", "댓글입력이 필요합니다.");
                postComments(postId);
                return
            } else {
                inputPostComment(postId, commenterId, comment);
                document.querySelector("#comments-input").removeAttribute("placeholder");
            }
            e.target.comment.value="";
        } catch (err) {
            console.log("에러났다");
        }
    });
} else {
    const postId = document.querySelector(".contents-id").textContent;
    postComments(postId);
};

async function inputPostComment(postId, commenterId, comment) {
    postId = postId;
    commenterId = commenterId;
    comment = comment;
    try {
        await axios.post(`/view/${postId}`, { postId, commenterId, comment });
        postComments(postId);
    } catch (err) {
        console.error(err);
        return
    }
}

async function editPostComment(id, comment) {
    const postId =document.querySelector(".contents-id").textContent;
    id = id;
    comment = comment;
    try {
        await axios.patch("/view/patch", { id, comment });
        postComments(postId);
    } catch (err) {
        console.error(err);
    }
}

async function postComments(id) {
    try {
        const postId = document.querySelector(".contents-id").textContent;
        const rawdata = await axios.get(`/view/${id}/comment`);
        const commentsdata = await rawdata.data[0].Communitycomments;
        const listbody = document.querySelector("#comments-list");
        console.log(commentsdata);
        listbody.innerHTML = "";
        commentsdata.map(async function (comments) {
            const commentTable = document.createElement("div");
            commentTable.setAttribute("class", "comment-table");

            let commentrow = document.createElement("div");
            commentrow.setAttribute("class", "commenter-id");
            commentrow.textContent = comments.User.nick;
            commentTable.appendChild(commentrow);

            const editForm = document.createElement("form");
            editForm.addEventListener("submit", async (e) => {
                if (document.querySelector("#my-id") !== null) {
                    e.preventDefault();
                    const editid = comments.id;
                    id = editid;
                    comment = e.target.comment.value;
                    editPostComment(id, comment);
                }
            });
            editForm.setAttribute("class", "edit-form");
            commentTable.appendChild(editForm);

            commentrow = document.createElement("input");
            commentrow.setAttribute("readonly", "");
            commentrow.setAttribute("type", "text");
            commentrow.setAttribute("name", "comment");
            commentrow.value = comments.comment;
            editForm.appendChild(commentrow);
            if (
                document.querySelector("#my-id") !== null &&
                document.querySelector("#my-id").value == comments.User.id
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
                            postComments(postId);
                        });
                        editForm.appendChild(commentEditCheck);
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
                        await axios.delete(`/view/delete/${comments.id}`);
                        postComments(postId);
                    } catch (err) {
                        console.error(err);
                    }
                });
            }

            listbody.appendChild(commentTable);

        });


    } catch (err) {
        console.log("에러났다");
    }
};