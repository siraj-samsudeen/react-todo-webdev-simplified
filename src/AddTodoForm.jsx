import { useRef, useState } from 'react';

export function AddTodoForm({ addTodo }) {
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
