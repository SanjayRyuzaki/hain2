const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        'X-Api-Key': process.env.API_KEY
      }
    });

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      res.json(data[0]); // send one quote
    } else {
      res.status(404).json({ quote: "No quote found", author: "Unknown" });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ quote: "Failed to fetch quote", author: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
