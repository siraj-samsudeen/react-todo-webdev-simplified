import { useEffect, useState } from 'react';
import './App.css';
import { TodoItems } from './TodoItems';
import { AddTodoForm } from './AddTodoForm';

function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(newTodo) {
    const newTodoObj = {
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodoObj]);
  }

  function toggleCompleted(todoId) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id == todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(todoId) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
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
