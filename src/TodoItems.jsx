import { useState } from 'react';
export function TodoItems({ todos, toggleCompleted, deleteTodo, onEditTodo }) {
  return (
    <>
      <h2>Todo Items</h2>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
            onEditTodo={onEditTodo}
          />
        ))}
      </ul>
    </>
  );
}

function TodoItem({
  id,
  completed,
  text,
  toggleCompleted,
  deleteTodo,
  onEditTodo,
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  function saveTodo() {
    setEditing(false);
    onEditTodo({
      id,
      text: editText,
      completed,
    });
  }

  return (
    <li>
      {editing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                saveTodo();
              }
            }}
          />
          <button onClick={saveTodo}>Save</button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompleted(id)}
            />
            {text}
          </label>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button className="delete" onClick={() => deleteTodo(id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}
