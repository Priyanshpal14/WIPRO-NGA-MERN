// src/stores/TodoStore.js
import AppDispatcher from "../dispatcher/Dispatcher";

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
      // no default
    }
  }
};

// Register the store with the dispatcher
AppDispatcher.register(TodoStore.handleAction.bind(TodoStore));

export default TodoStore;
