import React, { createContext, Component } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      this.setState({ 
        products: response.data, 
        loading: false 
      });
    } catch (error) {
      this.setState({ 
        error: 'Failed to fetch products', 
        loading: false 
      });
    }
  }

  addProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/products', product);
      this.setState(prevState => ({
        products: [...prevState.products, response.data]
      }));
      return response.data;
    } catch (error) {
      throw new Error('Failed to add product');
    }
  }

  render() {
    return (
      <ProductContext.Provider value={{
        products: this.state.products,
        loading: this.state.loading,
        error: this.state.error,
        addProduct: this.addProduct,
        refreshProducts: this.fetchProducts
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;