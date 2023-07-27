import { useEffect, useRef, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function AddTodoForm({ newTodo, setNewTodo, setTodos }) {
  const inputRef = useRef(null);

  function addTodo(event) {
    event.preventDefault();
    const newTodoObj = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodoObj]);
    setNewTodo('');
    inputRef.current.focus();
  }

  return (
    <form onSubmit={addTodo}>
      <label htmlFor="todo-text">New Item</label>
      <input
        type="text"
        name="todo-text"
        id="todo-text"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
        ref={inputRef}
        autoFocus
      />
      <button className="large" type="submit" disabled={newTodo == ''}>
        Add
      </button>
    </form>
  );
}

function TodoItems({ todos, toggleCompleted, deleteTodo }) {
  return (
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
  );
}
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
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

  return (
    <div className="container">
      <h1>Todo List App</h1>
      <AddTodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        setTodos={setTodos}
      />
      {todos.length > 0 && (
        <TodoItems
          todos={todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
