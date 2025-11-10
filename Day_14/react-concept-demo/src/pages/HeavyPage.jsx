import React from "react";

export default function HeavyPage() {
  return (
    <div>
      <h2>Heavy Page Loaded Lazily</h2>
      <p>This page was loaded using React.lazy() to demonstrate code splitting.</p>
      <img
        src="https://via.placeholder.com/600x300"
        alt="Heavy content"
        style={{ marginTop: "20px" }}
      />
    </div>
  );
}
