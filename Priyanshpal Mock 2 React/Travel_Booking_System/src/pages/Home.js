import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaPlane,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaStar,
} from "react-icons/fa";

function Home() {
  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/offers")
      .then((response) => setOffers(response.data))
      .catch((error) => console.error("Error:", error));

    axios
      .get("http://localhost:3001/testimonials")
      .then((response) => setTestimonials(response.data))
      .catch((error) => console.error("Error:", error));

    axios
      .get("http://localhost:3001/packages?_limit=3")
      .then((response) => setFeaturedPackages(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const categories = [
    { name: "Heritage", icon: <FaCity />, color: "#dc3545" },
    { name: "Beach", icon: <FaUmbrellaBeach />, color: "#0dcaf0" },
    { name: "Adventure", icon: <FaMountain />, color: "#198754" },
    { name: "Spiritual", icon: <FaPlane />, color: "#fd7e14" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-primary text-white py-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-3 fw-bold mb-4">
                Discover Incredible India
              </h1>
              <p className="lead mb-4">
                Explore breathtaking destinations across India with our curated
                travel packages. From Himalayan peaks to tropical beaches,
                create memories that last forever.
              </p>
              <div className="d-flex gap-3">
                <Link to="/packages" className="btn btn-light btn-lg px-4">
                  Explore Packages
                </Link>
                <Link
                  to="/booking"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Plan Your Trip
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600"
                alt="Travel"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Travel by Category</h2>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-md-3">
              <div
                className="card text-center h-100 shadow-sm hover-card"
                style={{ cursor: "pointer" }}
              >
                <div className="card-body">
                  <div className="fs-1 mb-3" style={{ color: category.color }}>
                    {category.icon}
                  </div>
                  <h5 className="card-title">{category.name}</h5>
                  <Link
                    to={`/packages?category=${category.name}`}
                    className="btn btn-sm btn-outline-primary mt-2"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Packages */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Packages</h2>
          <div className="row">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src={pkg.image}
                    className="card-img-top"
                    alt={pkg.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pkg.name}</h5>
                    <p className="text-muted small">{pkg.destination}</p>
                    <div className="d-flex align-items-center mb-2">
                      <FaStar color="#ffc107" />
                      <span className="ms-1">
                        {pkg.rating} ({pkg.reviews})
                      </span>
                    </div>
                    <h4 className="text-primary">{pkg.price}</h4>
                    <Link
                      to={`/package/${pkg.id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Special Offers</h2>
        <div className="row">
          {offers.map((offer) => (
            <div key={offer.id} className="col-md-4 mb-4">
              <div className="card border-primary h-100">
                <div className="card-body text-center">
                  <div className="badge bg-primary mb-3">{offer.code}</div>
                  <h5 className="card-title">{offer.title}</h5>
                  <p className="card-text">{offer.description}</p>
                  <small className="text-muted">
                    Valid till: {new Date(offer.validTill).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="2 / 2RetryPPContinuetext-center mb-5 fw-bold">
            What Our Travelers Say
          </h2>
          <div className="row">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} color="#ffc107" />
                      ))}
                    </div>
                    <p className="card-text fst-italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <strong>{testimonial.name}</strong>
                    <p className="text-muted small mb-0">
                      {testimonial.location}
                    </p>
                    <small className="text-muted">{testimonial.package}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Why Choose Us</h2>
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <div className="fs-1 text-primary mb-3">🎯</div>
              <h5>Best Price Guarantee</h5>
              <p className="text-muted">
                Competitive prices with no hidden charges
              </p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <div className="fs-1 text-primary mb-3">🛡️</div>
              <h5>Secure Booking</h5>
              <p className="text-muted">Safe and secure payment options</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <div className="fs-1 text-primary mb-3">🏆</div>
              <h5>Expert Guidance</h5>
              <p className="text-muted">Professional tour guides and support</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <div className="fs-1 text-primary mb-3">📞</div>
              <h5>24/7 Support</h5>
              <p className="text-muted">Round the clock customer assistance</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .hover-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default Home;
