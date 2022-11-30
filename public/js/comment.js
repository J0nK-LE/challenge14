const usersComments = document.getElementById('usersComments');

const delButtonHandler = async (event) => {
  event.preventDefault();
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

const updateButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const comment_data = document.getElementById(id).value;
    console.log(id, comment_data);
    const response = await fetch(`/api/comment/${id}`, {
      method: 'POST',
      body: JSON.stringify({ comment: comment_data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update comment');
    }
  }
};

document
  .querySelector('.deleteBtn')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.updateBtn')
  .addEventListener('click', updateButtonHandler);

document
  .querySelector('.commentBtn')
  .addEventListener('click', updateButtonHandler);
