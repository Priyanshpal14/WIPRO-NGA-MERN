// src/actions/TodoActions.js
import AppDispatcher from "../dispatcher/Dispatcher";

const TodoActions = {
  addTodo(text) {
    AppDispatcher.dispatch({
      type: "ADD_TODO",
      payload: text
    });
  }
};

export default TodoActions;
