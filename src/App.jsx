import { useEffect, useRef, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { TodoItems } from './TodoItems';

function AddTodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
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

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    if (todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(newTodo) {
    const newTodoObj = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodoObj]);
  }

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
      <AddTodoForm addTodo={addTodo} />
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
