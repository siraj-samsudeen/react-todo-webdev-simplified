import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  function toggleCompleted(todoId) {
    const updatedTodos = todos.map((todo) =>
      todo.id == todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function deleteTodo(todoId) {
    const updatedTodos = todos.filter((todo) => todo.id != todoId);
    setTodos(updatedTodos);
  }

  function addTodo(event) {
    event.preventDefault();
    const newTodoObj = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoObj]);
    setNewTodo('');
  }
  return (
    <div className="container">
      <h1>Todo List App</h1>
      <form onSubmit={addTodo}>
        <label htmlFor="todo-text">New Item</label>
        <input
          type="text"
          name="todo-text"
          id="todo-text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button className="large" type="submit">
          Add
        </button>
      </form>
      {todos.length > 0 && (
        <>
          <h2>Todo Items</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id)}
                  />
                  {todo.text}
                </label>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
