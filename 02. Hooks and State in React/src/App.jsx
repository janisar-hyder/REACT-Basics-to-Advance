import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState('white');
  const btnRef = useRef();

  useEffect(() => {
    alert('count is changed: ' + count);
    setNumber(count + 1);
  }, [count]);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <Navbar color={color} number={'number : ' + number} />
      <div>The value of count is {count}</div>
      <button onClick={() => setCount(count + 1)}>Count++</button>
      <button onClick={() => setColor(getRandomColor())}>Change Navbar Color</button>
      <button ref= {btnRef} onClick={()=>{ btnRef.current.style.backgroundColor = getRandomColor() }} >useRef</button>
    </>
  );
}

export default App;
