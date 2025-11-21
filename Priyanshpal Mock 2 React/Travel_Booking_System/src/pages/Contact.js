import React from 'react';

function Contact() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Get in Touch</h4>
          <p><strong>Email:</strong> info@travelbooking.com</p>
          <p><strong>Phone:</strong> +91 951 753 8462 </p>
          <p><strong>Address:</strong> 87, Travel Street, Indore, India</p>
        </div>
        <div className="col-md-6">
          <h4>Send us a message</h4>
          <form>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;