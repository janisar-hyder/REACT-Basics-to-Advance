import React, { useState, useEffect } from 'react';
import './App.css'


const Card = ({ title, body }) => {
  return (
    <div className="card">
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className="card-para">{body}</p>
      </div>
    </div>
  );
};


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='haha'>
      {data.map(item => (
        <Card key={item.id} title={item.title} body={item.body} />
      ))}
    </div>
  );
};

export default App;
