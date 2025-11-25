// Here is the file for ProductDetail component in React
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchProductDetail();
  }

  fetchProductDetail = async () => {
    const id = window.location.pathname.split('/')[2];
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      this.setState({ 
        product: response.data, 
        loading: false 
      });
    } catch (error) {
      this.setState({ 
        error: 'Failed to fetch product details', 
        loading: false 
      });
    }
  }

  render() {
    const { product, loading, error } = this.state;

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
            <Link to="/" className="btn btn-primary mt-3">Go Back Home</Link>
          </div>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="error-container">
          <div className="text-center">
            <h3> Product not found</h3>
            <Link to="/" className="btn btn-primary mt-3">Go Back Home</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="main-container">
          <Link to="/" className="btn btn-back mb-4">
            ← Back to Products
          </Link>
          
          <div className="product-detail-card">
            <div className="product-detail-header">
              <h1 className="product-detail-title">{product.name}</h1>
            </div>
            <div className="product-detail-body">
              <div className="detail-row">
                <div className="detail-label">Price</div>
                <div className="detail-value" style={{color: '#070d25ff'}}>₹{product.price}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Category</div>
                <div className="detail-value">
                  <span className="product-category">{product.category}</span>
                </div>
              </div>
              
              <div className="detail-row" style={{borderBottom: 'none'}}>
                <div className="detail-label">Description</div>
                <div className="detail-value" style={{fontSize: '1.1rem', fontWeight: '400', lineHeight: '1.6'}}>
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;