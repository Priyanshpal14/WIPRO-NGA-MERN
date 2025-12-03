import React, { useState, useEffect } from 'react';
import './ProgramList.css';

function ProgramList({ enrolledPrograms, setEnrolledPrograms }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getPrograms();
  }, []);

  const getPrograms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/programs');
      const data = await response.json();
      
      if (data.success) {
        setPrograms(data.data);
      } else {
        setError('Failed to load programs');
      }
      setLoading(false);
    } catch (err) {
      setError('Error connecting to server');
      setLoading(false);
    }
  };

  const enrollProgram = async (programId) => {
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'USR101',
          programId: programId
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Enrollment successful!');
        const newEnrolled = [...enrolledPrograms, programId];
        setEnrolledPrograms(newEnrolled);
      } else {
        if (data.message === 'Already enrolled') {
          setError('You are already enrolled in this program');
        } else {
          setError(data.message);
        }
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading programs...</div>;
  }

  if (error && programs.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="program-container">
      <h2>Available Programs</h2>
      
      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}

      <div className="program-list">
        {programs.map(program => (
          <div key={program.programId} className="program-card">
            <h3>{program.name}</h3>
            <p><strong>Category:</strong> {program.category}</p>
            <p><strong>Level:</strong> {program.level}</p>
            <p><strong>Price:</strong> ₹{program.price}</p>
            <button 
              onClick={() => enrollProgram(program.programId)}
              disabled={enrolledPrograms.includes(program.programId)}
            >
              {enrolledPrograms.includes(program.programId) ? 'Enrolled' : 'Enroll'}
            </button>
          </div>
        ))}
      </div>

      {enrolledPrograms.length > 0 && (
        <div className="enrolled-section">
          <h2>My Enrolled Programs</h2>
          <ul>
            {enrolledPrograms.map(id => {
              const prog = programs.find(p => p.programId === id);
              return prog ? <li key={id}>{prog.name}</li> : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProgramList;