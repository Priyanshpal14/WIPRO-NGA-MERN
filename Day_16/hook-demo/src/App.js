import React from 'react';  
// import HooksDemo from './components/HooksDemo';
import { useFetch } from './components/useFetch';
function App() {
  const data = useFetch('https://jsonplaceholder.typicode.com/posts');
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <h1>Hooks Demo - Fetching Data</h1>
      {data.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      {/* <HooksDemo posts={data} /> */}
    </div>
  );
}
  
export default App;

