// src/components/TodoList.js
import React, { useEffect, useState } from "react";
import TodoStore from "../stores/TodoStore";

function TodoList() {
  const [todos, setTodos] = useState(TodoStore.getTodos());

  useEffect(() => {
    const update = () => setTodos([...TodoStore.getTodos()]);
    TodoStore.addChangeListener(update);

    // optional: return cleanup if you later implement removeChangeListener
    return () => { /* cleanup if implemented */ };
  }, []);

  if (todos.length === 0) {
    return <p>No todos yet — add one above.</p>;
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}

export default TodoList;
