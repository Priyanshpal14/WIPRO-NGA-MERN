import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import {button,container} from 'react-bootstrap'; //as included via cli

function App() {
  return (
    // Using bootstrap class directly or via react-bootstrap
    <div className="container py-4">
      <h1 className="mb-3">Bootstrap in React</h1>
      <button className="btn btn-primary">Primary Button</button>
    </div>
  
  //        <Container className="container py=4">
  //       <h1 className="mb-3"> Bootstrap</h1>
  //       <Button variant="sucess">Success</Button>
  //       </Container>
  // );

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
