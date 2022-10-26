const addComment = document.getElementById('addComment');

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#comment-title').value.trim();
  const comment = document.querySelector('#comment-comment').value.trim();

  if (title && comment) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ title, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    }
  }
};



function addCommentForm() {
  addComment.removeAttribute('class', 'hide');
}
function removeCommentForm(){
    addComment.setAttribute('class', 'hide');
}

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

  document.querySelector('.newPostBtn').addEventListener('click', function () {
    addCommentForm();
  });