import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Todo List App</h1>
      <form>
        <label htmlFor="todo-text">New Item</label>
        <input type="text" name="todo-text" id="todo-text" />
        <button className="large" type="submit">
          Add
        </button>
      </form>
      <h2>Todo Items</h2>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            Todo1
          </label>
          <button className="delete">Delete</button>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            Todo2
          </label>
          <button className="delete">Delete</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
