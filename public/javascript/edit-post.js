const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log("Title: ", title);
  console.log("body: ", body);

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      "title": title,
      "post_body": body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);