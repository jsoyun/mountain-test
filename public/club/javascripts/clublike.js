const $like = document.querySelectorAll('.like');
const $unlike = document.querySelectorAll('.unlike');
const $myId = document.getElementById('my-id');

$like.forEach((tag) => {
  tag.addEventListener('click', () => {
    if($myId){
      const postId = tag.parentNode.querySelector('.twit-id').value;
      axios.post(`/club/${postId}/like`)
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
});

$unlike.forEach((tag) => {
  tag.addEventListener('click', () => {
    if($myId){
      const postId = tag.parentNode.querySelector('.twit-id').value;
      axios.delete(`/club/${postId}/unlike`)
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
});