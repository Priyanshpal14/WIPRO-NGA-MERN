import React, { useState } from 'react';
import CourseList from './CourseList';
import axios from 'axios';

function App() {
  const [enrolled, setEnrolled] = useState([]);
  const [message, setMessage] = useState('');
  const userId = 'user123';

  const handleEnroll = (courseId) => {
    axios.post('http://localhost:5000/api/enroll', { userId, courseId })
      .then(res => {
        setEnrolled([...enrolled, courseId]);
        setMessage('Successfully enrolled!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        const msg = err.response?.data?.message || 'Enrollment failed';
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
      });
  };

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
      <h1>SmartLearn Portal</h1>
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: message.includes('failed') ? '#d4d3d3ff' : '#d4d3d3ff',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
      <CourseList onEnroll={handleEnroll} enrolled={enrolled} />
      {enrolled.length > 0 && (
        <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#d4d3d3ff', borderRadius: '5px', color: 'black', textAlign: 'center'}}>
          <h3>My Enrolled Courses</h3>
          <ul>
            {enrolled.map(id => <li key={id}>{id}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;