const express = require('express');
const path = require('path');
const app = express();
const port = 3030;
const openai = require('openai-api');
const fs = require('fs');
const axios = require('axios');
const { api_key } = require('openai-node');

// get the API key from the json file
let apiKey = "";
fs.readFile('openai_key.json', (err, data) => {
  console.log("data:"+data)
    if (err) throw err;
    let key = JSON.parse(data);
    console.log(key);
    apiKey = key['OPENAI_API_KEY'];
    }   
);
//openai = new openai('OPENAI_API_KEY'); 


// Middleware to parse JSON payloads in POST requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Serve index.html at the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index02.html'));
});

// GET route
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

// POST route
app.post('/hello', (req, res) => {
  const name = req.body.name || 'world';
  res.send(`Hello, ${name}!`);
});

app.post('/test-prompt', async (req, res) => {
  console.log('POST request received');
  let data = req.body;
  let text = data.prompt;
  let type = data.sentiment;
  try {
      let input = "";
      if (type == 'positive') {
          input += '\nHuman: Write a positive response to the following email:'+text;
      } else {
      input += '\nHuman: Write a negative response to the following email:'+text;
      }

      res.json({ message: input });
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ error: 'An error occurred while processing your request' });
      }
});

app.post('/api', async (req, res) => {
  console.log('POST request received');
  let data = req.body;
  let text = data.prompt;
  let type = data.sentiment;
  try {
      let input = "";
      if (type == 'positive') {
          input += '\nHuman: Write a positive response to the following email:'+text;
      } else {
      input += '\nHuman: Write a negative response to the following email:'+text;
      }
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        };
        
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{role: 'user', content: `${input}`}],
        },
        { headers }
      );
  
      const chatGptResponse = response.data.choices[0].message.content;
        // send response back to client in the form of a JSON object
        // containing the response from the GPT-3 chatbot.
       
      console.log('ChatGPT Respnse:'+ JSON.stringify(chatGptResponse));
      res.json({ message: chatGptResponse });
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).json({ error: 'An error occurred while processing your request' });
      }
});
  
app.get('/test-key', async (req, res) => {
  try {
    await openai.createCompletion({
      prompt: "test",
      max_tokens: 5
    });
    res.send("API key is valid");
  } catch (error) {
    res.send("API key is invalid");
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
