// src/components/App.js
import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function App() {
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto", fontFamily: "Arial" }}>
      <h2>📝 Flux-Style Todo App</h2>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
