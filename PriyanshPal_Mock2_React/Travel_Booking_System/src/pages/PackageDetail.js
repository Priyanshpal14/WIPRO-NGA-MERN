import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaCalendar, FaCheckCircle, FaHeart, FaRegHeart, FaShare } from 'react-icons/fa';

function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  useEffect(() => {
    axios.get(`http://localhost:3001/packages/${id}`)
      .then(response => {
        setPkg(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a travel date');
      return;
    }
    navigate('/booking', { 
      state: { 
        packageId: pkg.id, 
        packageName: pkg.name,
        destination: pkg.destination,
        price: pkg.price,
        date: selectedDate,
        travelers: travelers
      } 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.name,
        text: pkg.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Package not found</div>
      </div>
    );
  }

  const totalPrice = parseInt(pkg.price.replace(/[₹,]/g, '')) * travelers;

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/packages">Packages</Link></li>
          <li className="breadcrumb-item active">{pkg.name}</li>
        </ol>
      </nav>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Image Gallery */}
          <div className="card shadow-sm mb-4">
            <img 
              src={pkg.image} 
              className="card-img-top" 
              alt={pkg.name}
              style={{height: '400px', objectFit: 'cover'}}
            />
          </div>

          {/* Package Info */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="badge bg-primary me-2">{pkg.category}</span>
                  <span className="badge bg-secondary">{pkg.state}</span>
                </div>
                <div>
                  <button 
                    className="btn btn-light me-2"
                    onClick={() => setWishlist(!wishlist)}
                  >
                    {wishlist ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>
                  <button className="btn btn-light" onClick={handleShare}>
                    <FaShare />
                  </button>
                </div>
              </div>

              <h2 className="fw-bold mb-3">{pkg.name}</h2>

              <div className="d-flex align-items-center mb-3">
                <FaMapMarkerAlt className="text-primary me-2" />
                <span className="text-muted">{pkg.destination}</span>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="me-4">
                  <FaStar color="#ffc107" />
                  <span className="ms-1 fw-bold">{pkg.rating}</span>
                  <span className="text-muted ms-1">({pkg.reviews} reviews)</span>
                </div>
                <div className="me-4">
                  <FaClock className="me-1" />
                  <span>{pkg.duration}</span>
                </div>
                <div>
                  <FaUsers className="me-1" />
                  <span>{pkg.groupSize}</span>
                </div>
              </div>

              <hr />

              <h5 className="fw-bold mb-3">About This Tour</h5>
              <p className="text-muted">{pkg.description}</p>

              <h5 className="fw-bold mb-3 mt-4">Tour Highlights</h5>
              <div className="row">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <FaCheckCircle className="text-success me-2" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <h5 className="fw-bold mb-3 mt-4">Package Includes</h5>
              <div className="row">
                {pkg.includes.map((item, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <FaCheckCircle className="text-primary me-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="alert alert-info mt-4">
                <FaCalendar className="me-2" />
                <strong>Best Time to Visit:</strong> {pkg.bestTime}
              </div>
            </div>
          </div>

          {/* Similar Packages */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">You Might Also Like</h5>
              <p className="text-muted">Explore similar destinations</p>
              <Link to="/packages" className="btn btn-outline-primary">
                View All Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="col-lg-4">
          <div className="card shadow sticky-top" style={{top: '20px'}}>
            <div className="card-body">
              <div className="text-center mb-3">
                {pkg.originalPrice && (
                  <div>
                    <span className="text-muted text-decoration-line-through">
                      {pkg.originalPrice}
                    </span>
                    <span className="badge bg-danger ms-2">
                      Save ₹{parseInt(pkg.originalPrice.replace(/[₹,]/g, '')) - parseInt(pkg.price.replace(/[₹,]/g, ''))}
                    </span>
                  </div>
                )}
                <h2 className="text-primary fw-bold mb-0">{pkg.price}</h2>
                <small className="text-muted">per person</small>
              </div>

              <hr />

              <div className="mb-3">
                <label className="form-label fw-bold">Select Travel Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Number of Travelers</label>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={travelers}
                    onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="10"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setTravelers(Math.min(10, travelers + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Price per person:</span>
                <span>{pkg.price}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Number of travelers:</span>
                <span>× {travelers}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total Amount:</strong>
                <strong className="text-primary">₹{totalPrice.toLocaleString()}</strong>
              </div>

              <button
                className="btn btn-primary w-100 btn-lg mb-2"
                onClick={handleBookNow}
              >
                Book Now
              </button>
              <button className="btn btn-outline-primary w-100">
                Contact Us
              </button>

              <div className="mt-3 text-center">
                <small className="text-muted">
                  💳 Secure payment • 🔒 Safe booking • 📞 24/7 Support
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;