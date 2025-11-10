// src/components/AddTodo.js
import React, { useState } from "react";
import TodoActions from "../actions/TodoActions";

function AddTodo() {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      TodoActions.addTodo(text);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Enter a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd} style={{ marginLeft: 8 }}>Add</button>
    </div>
  );
}

export default AddTodo;
