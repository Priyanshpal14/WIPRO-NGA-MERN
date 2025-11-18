import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackageCard from '../components/PackageCard';
import FilterSidebar from '../components/FilterSidebar';
import { FaSearch, FaSort } from 'react-icons/fa';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({
    categories: [],
    states: [],
    priceRange: null,
    rating: 0,
    search: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/packages')
      .then(response => {
        setPackages(response.data);
        setFilteredPackages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching packages:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterAndSortPackages();
  }, [filters, sortBy, packages]);

  const filterAndSortPackages = () => {
    let result = [...packages];

    // Search filter
    if (filters.search) {
      result = result.filter(pkg =>
        pkg.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(filters.search.toLowerCase()) ||
        pkg.state.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(pkg => filters.categories.includes(pkg.category));
    }

    // State filter
    if (filters.states.length > 0) {
      result = result.filter(pkg => filters.states.includes(pkg.state));
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(pkg => {
        const price = parseInt(pkg.price.replace(/[₹,]/g, ''));
        return price >= filters.priceRange.min && price <= filters.priceRange.max;
      });
    }

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter(pkg => pkg.rating >= filters.rating);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFilteredPackages(result);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Loading amazing packages...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-lg-3 mb-4">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            packages={packages}
          />
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Search and Sort Bar */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by destination, state, or package name..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaSort />
                    </span>
                    <select
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-3">
            <h5 className="text-muted">
              Showing {filteredPackages.length} of {packages.length} packages
            </h5>
          </div>

          {/* Package Cards */}
          {filteredPackages.length === 0 ? (
            <div className="alert alert-info text-center">
              <h4>No packages found</h4>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="row">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Packages;