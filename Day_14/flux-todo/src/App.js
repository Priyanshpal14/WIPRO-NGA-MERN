// src/App.js
import React, { useState, useEffect } from "react";
import AppDispatcher from "./Dispatcher";

/* =======================
   Actions
======================= */
const Actions = {
  addTodo(text) {
    AppDispatcher.dispatch({
      type: "ADD_TODO",
      payload: text
    });
  }
};

/* =======================
   Store
======================= */
const TodoStore = {
  todos: [],
  listeners: [],

  getTodos() {
    return this.todos;
  },

  addChangeListener(listener) {
    this.listeners.push(listener);
  },

  emitChange() {
    this.listeners.forEach(listener => listener());
  },

  handleAction(action) {
    switch (action.type) {
      case "ADD_TODO":
        this.todos.push(action.payload);
        this.emitChange();
        break;
      default:
      // do nothing
    }
  }
};

// Register store with dispatcher
AppDispatcher.register(TodoStore.handleAction.bind(TodoStore));

/* =======================
   Components
======================= */

function AddTodo() {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      Actions.addTodo(text);
      setText("");
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Enter a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState(TodoStore.getTodos());

  useEffect(() => {
    const update = () => setTodos([...TodoStore.getTodos()]);
    TodoStore.addChangeListener(update);
  }, []);

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}

/* =======================
   Main App
======================= */
export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Simple Flux-Style Todo App</h2>
      <AddTodo />
      <TodoList />
    </div>
  );
}
