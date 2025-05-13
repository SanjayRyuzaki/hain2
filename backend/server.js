const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // ✅ Required to make external API call

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so your frontend (on Vercel) can access this backend
app.use(cors());

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        'X-Api-Key': process.env.API_KEY  // ✅ Environment variable from Render
      }
    });

    const data = await response.json();

    // Send the first quote back to the frontend
    if (Array.isArray(data) && data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({ quote: "No quote found", author: "Unknown" });
    }

  } catch (error) {
    console.error("Failed to fetch quote:", error);
    res.status(500).json({ quote: "Error fetching quote", author: "API Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
