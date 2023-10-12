url = 'http://localhost:3030/hello';
function sendGet() {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById('response').textContent = data;
    });
}
function sendPost() {
  const name = document.getElementById('name').value;
  const data = JSON.stringify({ name: name });
  fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: data,
  })
  .then(response => response.text())
  .then(data => {
      document.getElementById('response').textContent = data;
  });
}