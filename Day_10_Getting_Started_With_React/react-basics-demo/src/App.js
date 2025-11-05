import logo from './logo.svg';
import './App.css';
import

function App() {
  const user = "New visitor"
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <h1> Functional Component demo </h1>
          <Welcome name = "Captain America "/>
          <Welcome name = "Spider man "/>
          <Welcome name = "Batman"/>
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
        <div>
          <h1> Welcome, {user} </h1>
          <p> This is a JSX demo in action </p>
          <p> JSX should return single parent element</p>
          <p> JSX expression go in between</p>
          {/* <p> Attributes in JSX uses camel casing {className, OnClick}</p> */}
        </div>
    </div>
  );
}

export default App;
