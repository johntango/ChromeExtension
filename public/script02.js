url = 'http://localhost:3030/test-prompt';

// on mouseup, display the highlighted text in the prompt div

document.addEventListener('mouseup', () => {
  console.log('mouseup')
  document.get
  let prompt = window.getSelection().toString();
  console.log(prompt);
  document.getElementById('prompt').value = prompt;
});

// on click, send the highlighted text to the server
function sendPositive() {
  sendPost('positive');
}

function sendNegative() {
  sendPost('negative');
}

// if there is highlighted text, send it to the server
// and display the response in the response div
function sendPost(sentiment) {
    sendRequest(sentiment);
}

function sendRequest(sentiment) {
  const prompt = window.getSelection().toString();
  const data = { prompt, sentiment };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').innerHTML = data.message;
    });
}
