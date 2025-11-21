import React from 'react';
import { FaFilter } from 'react-icons/fa';

function FilterSidebar({ filters, setFilters, packages }) {
  const categories = [...new Set(packages.map(p => p.category))];
  const states = [...new Set(packages.map(p => p.state))];
  const priceRanges = [
    { label: 'Under ₹15,000', min: 0, max: 15000 },
    { label: '₹15,000 - ₹25,000', min: 15000, max: 25000 },
    { label: '₹25,000 - ₹35,000', min: 25000, max: 35000 },
    { label: 'Above ₹35,000', min: 35000, max: 1000000 }
  ];

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories, category]
    });
  };

  const handleStateChange = (state) => {
    setFilters({
      ...filters,
      states: filters.states.includes(state)
        ? filters.states.filter(s => s !== state)
        : [...filters.states, state]
    });
  };

  const handlePriceChange = (range) => {
    setFilters({ ...filters, priceRange: range });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      states: [],
      priceRange: null,
      rating: 0,
      search: ''
    });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <span><FaFilter className="me-2" />Filters</span>
        <button className="btn btn-sm btn-light" onClick={clearFilters}>Clear All</button>
      </div>
      <div className="card-body">
        
        {/* Category Filter */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3">Category</h6>
          {categories.map(category => (
            <div key={category} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="form-check-label" htmlFor={`category-${category}`}>
                {category}
              </label>
            </div>
          ))}
        </div>

        <hr />

        {/* State Filter */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3">Destination State</h6>
          <div style={{maxHeight: '200px', overflowY: 'auto'}}>
            {states.map(state => (
              <div key={state} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`state-${state}`}
                  checked={filters.states.includes(state)}
                  onChange={() => handleStateChange(state)}
                />
                <label className="form-check-label small" htmlFor={`state-${state}`}>
                  {state}
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* Price Range */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3">Price Range</h6>
          {priceRanges.map((range, index) => (
            <div key={index} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="priceRange"
                id={`price-${index}`}
                checked={filters.priceRange === range}
                onChange={() => handlePriceChange(range)}
              />
              <label className="form-check-label" htmlFor={`price-${index}`}>
                {range.label}
              </label>
            </div>
          ))}
        </div>

        <hr />

        {/* Rating Filter */}
        <div className="mb-3">
          <h6 className="fw-bold mb-3">Minimum Rating</h6>
          <select 
            className="form-select"
            value={filters.rating}
            onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
          >
            <option value="0">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.8">4.8+ Stars</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default FilterSidebar;