// src/dispatcher/Dispatcher.js
class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
  }

  dispatch(action) {
    this.callbacks.forEach(callback => callback(action));
  }
}

const AppDispatcher = new Dispatcher();
export default AppDispatcher;
