import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [btn, setbtn] = useState("Click Me")
  const [from, setfrom] = useState({email: "", phone: ""})

  const handleclick = () =>{
    alert("button clicked");
  };

  const hover = ()=>{
    setbtn("Click Now");
  };

  const handleChnage = (e)=>{
    setfrom({...from, [e.target.name]:e.target.value})
  }
  return (
    <>
      <button onMouseOver={hover} onClick={handleclick}>{btn}</button>
      <input type="text" name='email' value={from.email? from.email : ""} onChange={handleChnage} />
      <input type="number" name='phone' value={from.phone? from.email : ""} onChange={handleChnage} />
    </>
  )
}

export default App
