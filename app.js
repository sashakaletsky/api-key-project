const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/interesting-fact', async (req, res) => {
  const monarchName = req.body.monarchName;
  const apiKey = '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'; // Replace with your actual API key

  const prompt = `Tell me the most interesting fact about the British monarch ${monarchName}.`;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from the GPT API.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
