import { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { TodoItems } from './TodoItems';
import { AddTodoForm } from './AddTodoForm';

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
