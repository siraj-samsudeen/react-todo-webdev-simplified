export function TodoItems({ todos, toggleCompleted, deleteTodo }) {
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
          />
        ))}
      </ul>
    </>
  );
}

function TodoItem({ id, completed, text, toggleCompleted, deleteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
        {text}
      </label>
      <button className="delete" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}
