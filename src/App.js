import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('characters');
  const [quoteCount, setQuoteCount] = useState(10);

  const fetchData = () => {
    let url = `https://api.gameofthronesquotes.xyz/v1/${category}`;

    if (category === 'random') {
      url += `/${quoteCount}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, [category, quoteCount]);

  const handleButtonClick = (category) => {
    setCategory(category);
  }

  const handleTextInput = (event) => {
    if (event.target.value < 2) {
      alert('Please enter a number greater than 2');
      setQuoteCount(2);
      return;
    }
    setQuoteCount(event.target.value);
  }

  return (
    <div>
      <h1>Game of Thrones</h1>
      <div>
        <button onClick={() => handleButtonClick('characters')}>Characters</button>
        <button onClick={() => handleButtonClick('houses')}>Houses</button>
        <button onClick={() => handleButtonClick('random')}>Quotes</button>
      </div>
      {category === 'random' &&
        <div>
          <label htmlFor="quote-count-input">Number of quotes:</label>
          <input type="number" id="quote-count-input" value={quoteCount} onChange={handleTextInput} />
        </div>
      }
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {category === 'characters' &&
              <div>
                {item.name}
              </div>
            }
            {category === 'houses' &&
              <div>
                {item.name}
              </div>
            }
            {category === 'random' &&
              <div>
                {item.sentence}
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
