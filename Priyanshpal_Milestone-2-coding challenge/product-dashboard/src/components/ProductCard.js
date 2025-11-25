// Here is the file for ProductCard component in React

import React from 'react';

function ProductCard(props) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Price: ₹{props.price}</p>
          <p className="card-text">Category: {props.category}</p>
          <button 
            className={props.isFavorite ? "btn btn-danger" : "btn btn-outline-danger"}
            onClick={() => props.onToggleFavorite(props.id)}
          >
            {props.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;