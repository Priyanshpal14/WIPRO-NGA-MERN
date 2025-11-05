// Here we will see simple code for welcome component//

//Step 1 : Importing react from 'react' ;
//Step 2: creating a function that returns JSX
//Step 3: importing this component and using it in app.js
//Step 4: running and building

import React from 'react';

function Welcome(props) {
  return (
    <div>
      <h2>Hello, {props.name}!</h2>
      <p>Welcome to your first React component.</p>
    </div>
  );
}

export default Welcome;