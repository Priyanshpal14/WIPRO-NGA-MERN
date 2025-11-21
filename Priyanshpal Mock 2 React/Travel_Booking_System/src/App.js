import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './Header';
import Footer from './Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import BookingForm from './pages/BookingForm';
import BookingDashboard from './pages/BookingDashboard';
import Contact from './pages/Contact';
import ErrorBoundary from './ErrorBoundary';
import './PageTransition.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/package/:id" element={<PackageDetail />} />
                <Route path="/booking" element={<BookingForm />} />
                <Route path="/dashboard" element={<BookingDashboard />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;