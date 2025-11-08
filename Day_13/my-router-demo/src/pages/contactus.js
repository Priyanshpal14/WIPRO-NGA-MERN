// src/pages/contactus.js
import React from "react";

function ContactUs() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out!</p>
      <div style={{ marginTop: "20px" }}>
        <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Main Street, Cityville, USA</p>
      </div>
    </div>
  );
}

export default ContactUs;
