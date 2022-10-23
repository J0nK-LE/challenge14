const addComment = document.getElementById('addComment');
const usersComments = document.getElementById('usersComments');

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  }
};

function addCommentForm() {
  usersComments.setAttribute('class', 'hide');
  addComment.removeAttribute('class', 'hide');
}
function removeCommentForm(){
    addComment.setAttribute('class', 'hide');
    usersComments.removeAttribute('class', 'hide');
}

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);

  document.querySelector('.newPostBtn').addEventListener('click', function () {
    addCommentForm();
  });