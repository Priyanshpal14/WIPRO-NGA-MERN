import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseList({ onEnroll, enrolled }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load courses');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div style={{padding: '20px'}}>
      <h2>Available Courses</h2>
      <div style={{display: 'grid', gap: '15px'}}>
        {courses.map(course => (
          <div key={course.courseId} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px'}}>
            <h3>{course.title}</h3>
            <p>Category: {course.category}</p>
            <p>Price: ₹{course.price}</p>
            <button 
              onClick={() => onEnroll(course.courseId)}
              disabled={enrolled.includes(course.courseId)}
              style={{padding: '8px 16px', cursor: 'pointer'}}
            >
              {enrolled.includes(course.courseId) ? 'Enrolled' : 'Enroll Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;