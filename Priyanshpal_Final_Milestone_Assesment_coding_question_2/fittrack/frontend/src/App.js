import React, { useState } from 'react';
import ProgramList from './components/ProgramList';
import './App.css';

function App() {
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);

  return (
    <div className="App">
      <h1>FitTrack - Fitness Portal</h1>
      <ProgramList 
        enrolledPrograms={enrolledPrograms}
        setEnrolledPrograms={setEnrolledPrograms}
      />
    </div>
  );
}

export default App;