import React from "react";

export default function HeavyPage() {
  const bigText = new Array(100).fill("This is a heavy component...").join(" ");
  return (
    <div style={{ marginTop: 20 }}>
      <h3>💾 Heavy Page Loaded!</h3>
      <p>{bigText}</p>
      <img
        src="https://via.placeholder.com/400x200"
        alt="Placeholder"
        style={{ marginTop: 10 }}
      />
    </div>
  );
}
