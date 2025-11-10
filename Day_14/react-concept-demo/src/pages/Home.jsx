import React from "react";

export default function Home() {
  return (
    <div>
      <p>Select a concept to view examples:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🚀 Lazy Loading</li>
        <li>🧠 Pure Component</li>
        <li>🛑 Error Boundary</li>
        <li>🪟 Portal (Modal)</li>
      </ul>
    </div>
  );
}
