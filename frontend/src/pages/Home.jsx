import React, { useState, useEffect } from 'react';

function Home() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the message from the backend when the component mounts
    fetch('http://localhost:4000/api/message')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
      });
  }, []);

  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.jsx</code> and save to test HMR
        </p>
        <p>Message from the backend: {message}</p> {/* Display the message from the backend */}
      </div>
    </div>
  );
}

export default Home;