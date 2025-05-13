import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          'X-Api-Key': 'o6WNP7hQkMawGhJ4kG6V9w==TR2o5XlpSPYuVp15'
        }
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setQuote({
          quote: data[0].quote,
          author: data[0].author
        });
      } else {
        setQuote({ quote: "No quote found.", author: "Unknown" });
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ quote: "API request failed.", author: "Error" });
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

export default App; // ✅ This is essential!
