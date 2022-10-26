const usersComments = document.getElementById('usersComments');

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

document
  .querySelector('.deleteBtn')
  .addEventListener('click', function() { delButtonHandler()
    console.log("CLICK")
})