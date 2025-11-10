import React, { useState } from "react";

export default function ExplodingChild() {
  const [crash, setCrash] = useState(false);

  if (crash) throw new Error("Boom! Component crashed.");

  return (
    <div>
      <p>This component can simulate an error.</p>
      <button onClick={() => setCrash(true)}>Cause Error</button>
    </div>
  );
}
