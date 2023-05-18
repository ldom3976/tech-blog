const commentFormHandler = async function(event) {
  event.preventDefault();

  const postId = document.querySelector('#post-id').value;
  const body = document.querySelector('#comment-body').value;

  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        "post_id": postId,
        "comment_body": body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);