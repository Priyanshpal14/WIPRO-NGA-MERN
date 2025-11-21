import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaHeart, FaRegHeart, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PackageCard({ pkg }) {
  const [wishlist, setWishlist] = useState(false);
  const navigate = useNavigate();

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlist(!wishlist);
  };

  const handleViewDetails = () => {
    navigate(`/package/${pkg.id}`);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm hover-card" style={{cursor: 'pointer', transition: 'transform 0.3s'}}>
        <div className="position-relative">
          <img 
            src={pkg.image} 
            className="card-img-top" 
            alt={pkg.name} 
            style={{height: '250px', objectFit: 'cover'}}
            onClick={handleViewDetails}
          />
          <span className="badge bg-primary position-absolute top-0 start-0 m-2">
            {pkg.category}
          </span>
          <button 
            className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle p-2"
            onClick={handleWishlist}
            style={{width: '40px', height: '40px'}}
          >
            {wishlist ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          {pkg.originalPrice && (
            <span className="badge bg-danger position-absolute bottom-0 end-0 m-2">
              Save ₹{parseInt(pkg.originalPrice.replace(/[₹,]/g, '')) - parseInt(pkg.price.replace(/[₹,]/g, ''))}
            </span>
          )}
        </div>
        
        <div className="card-body" onClick={handleViewDetails}>
          <h5 className="card-title fw-bold">{pkg.name}</h5>
          
          <div className="d-flex align-items-center mb-2 text-muted small">
            <FaMapMarkerAlt className="me-1" />
            <span>{pkg.destination}</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <FaStar color="#ffc107" />
            <span className="ms-1 fw-bold">{pkg.rating}</span>
            <span className="text-muted ms-1">({pkg.reviews} reviews)</span>
          </div>

          <p className="card-text text-muted small">{pkg.description}</p>

          <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
            <span><FaClock className="me-1" />{pkg.duration}</span>
            <span><FaUsers className="me-1" />{pkg.groupSize}</span>
          </div>

          <div className="d-flex flex-wrap gap-1 mb-3">
            {pkg.highlights.slice(0, 3).map((highlight, index) => (
              <span key={index} className="badge bg-light text-dark border">{highlight}</span>
            ))}
          </div>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
          <div>
            {pkg.originalPrice && (
              <span className="text-muted text-decoration-line-through small me-2">
                {pkg.originalPrice}
              </span>
            )}
            <h4 className="text-primary mb-0">{pkg.price}</h4>
            <small className="text-muted">per person</small>
          </div>
          <button className="btn btn-primary" onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>

      <style jsx="true">{`
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </div>
  );
}

PackageCard.propTypes = {
  pkg: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    originalPrice: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    includes: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    bestTime: PropTypes.string.isRequired,
    groupSize: PropTypes.string.isRequired
  }).isRequired
};

export default PackageCard;