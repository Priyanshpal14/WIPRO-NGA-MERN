import React from "react";

class PureDisplay extends React.PureComponent {
  render() {
    console.log("PureDisplay rendered");
    return (
      <div style={{ marginTop: 20 }}>
        <h3>🧠 Pure Component Example</h3>
        <p>This component only re-renders when its props/state change.</p>
      </div>
    );
  }
}

export default PureDisplay;
