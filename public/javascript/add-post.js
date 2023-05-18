const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;
  console.log("Title: ", title);
  console.log("body: ", body);

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      "title": title,
      "post_body": body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);