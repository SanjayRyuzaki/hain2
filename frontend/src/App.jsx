import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://weather-backend-o983.onrender.com/api/quote");
      const data = await response.json();
      setQuote({
        quote: data.quote,
        author: data.author
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container">
      <div className="quote-wrapper">
        <h1 className="page-title">Quote of the Day</h1>
        <div className="quote-box">
          {quote && (
            <>
              <p className="quote">"{quote.quote}"</p>
              <p className="author">— {quote.author}</p>
            </>
          )}
          <button onClick={fetchQuote}>Get New Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
