if (document.getElementById("img")) {
  let uploadNum = 0; //올린 사진 셀 변수 
  let index = 0; //img 에 붙일 index
  document.getElementById("img").addEventListener("change", async function (e) {
    const formData = new FormData();
    const length = this.files.length;
    const max = 4; //사진 최대 4장까지
    switch (uploadNum) {
      case 0:
        if (length > max - uploadNum) {
          alert("사진은 최대 4장까지만 가능합니다.");
          return;
        }
        uploadNum += length;
        break;
      case 1:
        if (length > max - uploadNum) {
          alert("사진은 최대 4장까지만 가능합니다.");
          return;
        }
        uploadNum += length;
        break;
      case 2:
        if (length > max - uploadNum) {
          alert("사진은 최대 4장까지만 가능합니다.");
          return;
        }
        uploadNum += length;
        break;
      case 3:
        if (length > max - uploadNum) {
          alert("사진은 최대 4장까지만 가능합니다.");
          return;
        }
        uploadNum += length;
        break;
      default:
        alert("사진은 최대 4장까지만 가능합니다.");
        return;
    }

    for (let i = 0; i < length; i++) {
      const imgfiles = await this.files[i];
      formData.append("img", imgfiles);
    }
    axios.post("/clubupload/img", formData)
      .then(async (res) => {
        let url = await JSON.parse(res.data);
        console.log(url);
        let img_html = "";
        for (let i = 0; i < url.length; i++) {
          console.log("미리보기", url[i]);
          img_html += `<div class="img-preview${index}"> 
          <img id="img-preview${index}" src="${url[i]}" width="250" alt="미리보기"> 
          <input id="img-url" type="hidden" name="url" value="${url[i]}"> 
          </div>`;
        }
        document.querySelector('.img-preview').innerHTML = img_html;
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
