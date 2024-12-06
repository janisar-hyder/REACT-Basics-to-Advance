import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(true);
  const [todos, setTodos] = useState([
    {
      title: "Buy Milk",
      desc: "Buy milk from the store"
    },
    {
      title: "Do Homework",
      desc: "Do homework for the day"
    },
    {
      title: "Watch Movie",
      desc: "Watch a movie for the evening"
    },
    {
      title: "buy clothes",
      desc: "buy clothes from outfitters"
    }

  ])
  // const Todo = ({todo})=>{
  //   return (
  //     <>
  //     <div className="m-4 border border-1 border-purple-400">
  //     <div className="todo">{todo.title}</div>
  //     <div className="todo">{todo.desc}</div>
  //     </div>
  //     </>
  //   )
  // }



  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {todos.map(todo=>{
        // return <Todo key={todo.title} todo={todo}/>
        return <div key= {todo.title} className="m-4 border border-1 border-purple-400">
        <div className="todo">{todo.title}</div>
        <div className="todo">{todo.desc}</div>
        </div>
      })}

    </div>
  );
}

export default App;
