const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const quotes = [
  { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { quote: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" }
];

app.use(cors());

app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
