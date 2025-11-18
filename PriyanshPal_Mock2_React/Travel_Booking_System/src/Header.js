import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaPhone, FaEnvelope, FaHome, FaBox, FaCalendarAlt, FaChartLine, FaEnvelopeOpen } from 'react-icons/fa';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome />, color: '#dc3545' },
    { path: '/packages', label: 'Packages', icon: <FaBox />, color: '#0dcaf0' },
    { path: '/booking', label: 'Book Now', icon: <FaCalendarAlt />, color: '#198754' },
    { path: '/dashboard', label: 'My Bookings', icon: <FaChartLine />, color: '#fd7e14' },
    { path: '/contact', label: 'Contact', icon: <FaEnvelopeOpen />, color: '#6f42c1' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 small">
              <FaPhone className="me-2" />
              +91 951 753 8462
              <span className="ms-3">
                <FaEnvelope className="me-2" />
                info@travelbooking.com
              </span>
            </div>
            <div className="col-md-6 text-md-end small">
              <span>🎁 Use code FESTIVE10 for 10% off on all bookings!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            <span style={{fontSize: '1.5rem'}}>✈️ TravelIndia</span>
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-2">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    className={`nav-link custom-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    to={item.path}
                    style={{
                      '--hover-color': item.color,
                      backgroundColor: isActive(item.path) ? item.color : 'transparent',
                      color: isActive(item.path) ? '#fff' : '#333',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      transition: 'all 0.3s ease',
                      border: `2px solid ${isActive(item.path) ? item.color : 'transparent'}`,
                      fontWeight: isActive(item.path) ? '600' : '500'
                    }}
                  >
                    <span className="me-2">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <form className="d-flex" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{minWidth: '200px'}}
                />
                <button className="btn btn-primary" type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      <style jsx="true">{`
        .custom-nav-link {
          position: relative;
          overflow: hidden;
        }

        .custom-nav-link:hover {
          background-color: var(--hover-color) !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border-color: var(--hover-color) !important;
        }

        .custom-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.3s ease;
        }

        .custom-nav-link:hover::before {
          left: 100%;
        }

        .custom-nav-link.active {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        /* Mobile Responsiveness */
        @media (max-width: 991px) {
          .navbar-nav {
            margin-top: 1rem;
          }
          
          .custom-nav-link {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default Header;