// Here is the file for ProductList component in React

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

class ProductList extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  handleToggleFavorite = (productId) => {
    this.setState(prevState => {
      const isFavorite = prevState.favorites.includes(productId);
      if (isFavorite) {
        return {
          favorites: prevState.favorites.filter(id => id !== productId)
        };
      } else {
        return {
          favorites: [...prevState.favorites, productId]
        };
      }
    });
  }

  render() {
    const { products, loading, error } = this.context;

    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="text-center">
            <h3 className="text-danger"> {error}</h3>
            <p className="text-muted">Please try again later</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="main-container">
          <div className="page-header">
            <h1 className="page-title">Product Catalog</h1>
            <Link to="/add-product" className="btn btn-primary btn-add-product">
              + Add New Product
            </Link>
          </div>
          
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">empty </div>
              <h3>No Products Available</h3>
              <p>Start by adding your first product!</p>
            </div>
          ) : (
            <div className="row">
              {products.map(product => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="product-card">
                    <div className="product-card-header">
                      <h5 className="product-card-title">{product.name}</h5>
                    </div>
                    <div className="product-card-body">
                      <div className="product-price">₹{product.price}</div>
                      <span className="product-category">{product.category}</span>
                      <div className="btn-group-product">
                        <Link to={`/product/${product.id}`} className="btn btn-primary btn-view-details">
                          View Details
                        </Link>
                        <button 
                          className={`btn btn-favorite ${this.state.favorites.includes(product.id) ? 'active' : ''}`}
                          onClick={() => this.handleToggleFavorite(product.id)}
                        >
                          {this.state.favorites.includes(product.id) ? "Remove" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductList;