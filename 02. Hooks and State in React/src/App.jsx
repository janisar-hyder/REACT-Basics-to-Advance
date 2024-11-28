import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



// useState Hook Implementation
// function App() {
//   const [count, setCount] = useState(0)
//   return (
//     <>
//       <div>The value of count is {count}</div>
//       <button onClick={()=>{setCount(count+1)}} >Count++</button>
//     </>
//   )
// }

function App() {

  const [count, setCount] = useState(0)
  return (
    <>
      <div>The value of count is {count}</div>
      <button onClick={()=>{setCount(count+1)}} >Count++</button>
    </>
  )

}

export default App
