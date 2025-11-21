import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBookingStatus, deleteBooking } from '../redux/actions';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaFilter, FaDownload } from 'react-icons/fa';

function BookingDashboard() {
  const bookings = useSelector(state => state.bookings);
  const totalBookings = useSelector(state => state.totalBookings);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState('All');

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateBookingStatus(id, newStatus));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(deleteBooking(id));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': 'warning',
      'Confirmed': 'success',
      'Cancelled': 'danger',
      'Completed': 'info'
    };
    return badges[status] || 'secondary';
  };

  const filteredBookings = filterStatus === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus);

  const stats = {
    total: totalBookings,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length
  };

  const exportToCSV = () => {
    if (bookings.length === 0) {
      alert('No bookings to export');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Destination', 'Date', 'Travelers', 'Status'];
    const csvContent = [
      headers.join(','),
      ...bookings.map(b => [
        b.id,
        b.name,
        b.email,
        b.destination,
        new Date(b.date).toLocaleDateString(),
        b.travelers,
        b.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Bookings Dashboard</h2>
        <button className="btn btn-outline-primary" onClick={exportToCSV}>
          <FaDownload className="me-2" />
          Export CSV
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h3 className="mb-0">{stats.total}</h3>
              <p className="mb-0 small">Total Bookings</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h3 className="mb-0">{stats.confirmed}</h3>
              <p className="mb-0 small">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white shadow">
            <div className="card-body text-center">
              <h3 className="mb-0">{stats.pending}</h3>
              <p className="mb-0 small">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h3 className="mb-0">{stats.cancelled}</h3>
              <p className="mb-0 small">Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <FaFilter className="me-2 text-primary" />
            <span className="me-3 fw-bold">Filter by Status:</span>
            <div className="btn-group" role="group">
              <button
                className={`btn btn-sm ${filterStatus === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilterStatus('All')}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'Pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setFilterStatus('Pending')}
              >
                Pending
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'Confirmed' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setFilterStatus('Confirmed')}
              >
                Confirmed
              </button>
              <button
                className={`btn btn-sm ${filterStatus === 'Cancelled' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setFilterStatus('Cancelled')}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <div className="fs-1 mb-3">📋</div>
            <h4>No bookings found</h4>
            <p className="text-muted">
              {filterStatus === 'All' 
                ? "You haven't made any bookings yet. Start exploring our amazing packages!" 
                : `No ${filterStatus.toLowerCase()} bookings found.`}
            </p>
            <a href="/packages" className="btn btn-primary mt-3">Browse Packages</a>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop View - Table */}
          <div className="card shadow-sm d-none d-md-block">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Booking ID</th>
                    <th>Traveler Details</th>
                    <th>Trip Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>
                        <strong>#{booking.id}</strong>
                        <br />
                        <small className="text-muted">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <strong>{booking.name}</strong>
                        <br />
                        <small className="text-muted">{booking.email}</small>
                        <br />
                        <small className="text-muted">{booking.phone}</small>
                      </td>
                      <td>
                        <div className="mb-1">
                          <FaMapMarkerAlt className="text-primary me-1" />
                          <small>{booking.destination}</small>
                        </div>
                        <div className="mb-1">
                          <FaCalendar className="text-primary me-1" />
                          <small>{new Date(booking.date).toLocaleDateString()}</small>
                        </div>
                        <div>
                          <FaUsers className="text-primary me-1" />
                          <small>{booking.travelers} travelers</small>
                        </div>
                      </td>
                      <td>
                        <select
                          className={`form-select form-select-sm badge bg-${getStatusBadge(booking.status)}`}
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          style={{width: 'auto', border: 'none', fontWeight: 'bold'}}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(booking.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View - Cards */}
          <div className="d-md-none">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="card shadow-sm mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <strong>Booking #{booking.id}</strong>
                  <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{booking.name}</h6>
                  <p className="card-text small mb-2">
                    <FaMapMarkerAlt className="text-primary me-1" />
                    {booking.destination}
                  </p>
                  <p className="card-text small mb-2">
                    <FaCalendar className="text-primary me-1" />
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="card-text small mb-3">
                    <FaUsers className="text-primary me-1" />
                    {booking.travelers} travelers
                  </p>
                  <div className="d-flex gap-2">
                    <select
                      className="form-select form-select-sm"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BookingDashboard;