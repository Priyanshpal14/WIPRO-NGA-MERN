import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductProvider from './context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Lazy load ProductDetail component for better performance
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const AddProduct = lazy(() => import('./components/AddProduct'));

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="App">
          <Suspense fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;