import React from "react";

const PureDisplay = React.memo(({ title, count }) => {
  console.log("PureDisplay rendered");
  return (
    <div>
      <h3>{title}</h3>
      <p>Count: {count}</p>
    </div>
  );
});

export default PureDisplay;
