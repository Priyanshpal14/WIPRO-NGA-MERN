import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DestinationCard(props) {
  const [wishlist, setWishlist] = useState(false);

  const handleWishlist = () => {
    setWishlist(!wishlist);
    alert(wishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={props.image} className="card-img-top" alt={props.name} style={{height: '200px', objectFit: 'cover'}} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <p className="text-primary fw-bold">{props.price}</p>
          <button 
            className={wishlist ? 'btn btn-danger' : 'btn btn-outline-primary'} 
            onClick={handleWishlist}>
            {wishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
DestinationCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default DestinationCard;