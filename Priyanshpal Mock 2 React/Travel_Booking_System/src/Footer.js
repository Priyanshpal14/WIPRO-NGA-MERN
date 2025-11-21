import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3 text-white">TravelIndia</h5>
            <p className="small" style={{color: '#b8b8b8'}}>
              Your trusted travel partner for exploring the incredible beauty of India. 
              Book with confidence and create unforgettable memories.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#!" className="text-white" style={{fontSize: '20px'}}>
                <FaFacebook />
              </a>
              <a href="#!" className="text-white" style={{fontSize: '20px'}}>
                <FaTwitter />
              </a>
              <a href="#!" className="text-white" style={{fontSize: '20px'}}>
                <FaInstagram />
              </a>
              <a href="#!" className="text-white" style={{fontSize: '20px'}}>
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/packages" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  All Packages
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/booking" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Book Now
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  My Bookings
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-white">Popular Destinations</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#!" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Goa
                </a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Kerala
                </a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Rajasthan
                </a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Ladakh
                </a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-decoration-none" style={{color: '#b8b8b8'}}>
                  Himachal Pradesh
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-white">Contact Us</h6>
            <ul className="list-unstyled small">
              <li className="mb-3" style={{color: '#b8b8b8'}}>
                <FaMapMarkerAlt className="me-2" style={{color: '#0d6efd'}} />
                87, Travel Street, Indore, India
              </li>
              <li className="mb-3" style={{color: '#b8b8b8'}}>
                <FaPhone className="me-2" style={{color: '#0d6efd'}} />
                +91 951 753 8462
              </li>
              <li className="mb-3" style={{color: '#b8b8b8'}}>
                <FaEnvelope className="me-2" style={{color: '#0d6efd'}} />
                info@travelbooking.com
              </li>
            </ul>
            <div className="mt-3">
              <h6 className="small fw-bold text-white mb-2">Newsletter</h6>
              <div className="input-group input-group-sm">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email"
                  style={{backgroundColor: '#fff', color: '#000'}}
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr style={{backgroundColor: '#444', opacity: '0.5'}} className="my-4" />

        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0" style={{color: '#b8b8b8'}}>
              © 2024 TravelIndia. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#!" className="text-decoration-none small me-3" style={{color: '#b8b8b8'}}>
              Privacy Policy
            </a>
            <a href="#!" className="text-decoration-none small me-3" style={{color: '#b8b8b8'}}>
              Terms of Service
            </a>
            <a href="#!" className="text-decoration-none small" style={{color: '#b8b8b8'}}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;