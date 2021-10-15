const image = document.getElementById('img');
if (image) {
    image.addEventListener('change', function (e) {
        const temp = `<img id="img-preview" src="{{communityTwits.img}}" width="300px" alt="미리보기" />
        <input id="img-url" type="hidden" name="url" />`
        const inputtarget = document.querySelector(".img-preview");
        inputtarget.innerHTML = "";
        inputtarget.innerHTML = temp;

        const imageUrl = document.getElementById('img-url');
        const imagePreview = document.getElementById('img-preview');

        const formData = new FormData();
        console.log(this, this.files);
        formData.append('img', this.files[0]);
        axios.post('/edit/:id/img', formData)
            .then((res) => {
                imageUrl.value = res.data.url;
                imagePreview.src = res.data.url;
                imagePreview.style.display = 'inline';
            })
            .catch((err) => {
                console.error(err);
            });
    });
};
