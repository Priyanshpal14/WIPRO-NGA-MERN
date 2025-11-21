import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBooking } from '../redux/actions';
import useFormSubmit from '../hooks/useFormSubmit';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUsers } from 'react-icons/fa';

function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { submitting, handleSubmit } = useFormSubmit();

  const packageData = location.state || {};

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
    destination: Yup.string()
      .required('Please select a destination'),
    date: Yup.date()
      .required('Travel date is required')
      .min(new Date(), 'Date must be in the future'),
    travelers: Yup.number()
      .required('Number of travelers is required')
      .min(1, 'At least 1 traveler required')
      .max(10, 'Maximum 10 travelers allowed'),
    address: Yup.string()
      .required('Address is required')
      .min(10, 'Please provide complete address'),
    specialRequests: Yup.string()
  });

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    destination: packageData.destination || '',
    date: packageData.date || '',
    travelers: packageData.travelers || 1,
    address: '',
    specialRequests: ''
  };

  const onSubmit = async (values, { resetForm }) => {
    const success = await handleSubmit(values, async (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch(addBooking({
            ...data,
            packageName: packageData.packageName,
            price: packageData.price
          }));
          alert('🎉 Booking submitted successfully! Check the dashboard to track your booking.');
          resetForm();
          navigate('/dashboard');
          resolve();
        }, 1500);
      });
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Book Your Dream Vacation</h3>
              <p className="mb-0 small">Fill in your details to confirm your booking</p>
            </div>
            <div className="card-body p-4">
              {packageData.packageName && (
                <div className="alert alert-info mb-4">
                  <h5 className="alert-heading">Selected Package</h5>
                  <p className="mb-1"><strong>{packageData.packageName}</strong></p>
                  <p className="mb-1">Destination: {packageData.destination}</p>
                  <p className="mb-0">Price: {packageData.price} per person</p>
                </div>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values }) => (
                  <Form>
                    <h5 className="mb-3 text-primary">Personal Information</h5>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><FaUser className="me-2" />Full Name *</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                        <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label"><FaEnvelope className="me-2" />Email Address *</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="your.email@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><FaPhone className="me-2" />Mobile Number *</label>
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="10-digit mobile number"
                          maxLength="10"
                        />
                        <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label"><FaMapMarkerAlt className="me-2" />Destination *</label>
                        <Field as="select" name="destination" className="form-control">
                          <option value="">Select a destination</option>
                          <option value="Delhi, Agra, Jaipur">Golden Triangle (Delhi, Agra, Jaipur)</option>
                          <option value="Alleppey, Kumarakom, Kochi">Kerala Backwaters</option>
                          <option value="North & South Goa">Goa Beaches</option>
                          <option value="Manali, Shimla">Himachal (Manali, Shimla)</option>
                          <option value="Udaipur, Jodhpur, Jaisalmer">Rajasthan Heritage</option>
                          <option value="Leh, Nubra Valley, Pangong">Ladakh</option>
                          <option value="Port Blair, Havelock, Neil Island">Andaman Islands</option>
                          <option value="Varanasi, Sarnath">Varanasi</option>
                          <option value="Darjeeling, Gangtok">Darjeeling & Gangtok</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Rishikesh">Rishikesh</option>
                          <option value="Mysore, Coorg">Mysore & Coorg</option>
                        </Field>
                        <ErrorMessage name="destination" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Complete Address *</label>
                      <Field
                        as="textarea"
                        name="address"
                        className="form-control"
                        rows="2"
                        placeholder="Enter your complete address"
                      />
                      <ErrorMessage name="address" component="div" className="text-danger small mt-1" />
                    </div>

                    <hr className="my-4" />

                    <h5 className="mb-3 text-primary">Trip Details</h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><FaCalendar className="me-2" />Travel Date *</label>
                        <Field
                          type="date"
                          name="date"
                          className="form-control"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <ErrorMessage name="date" component="div" className="text-danger small mt-1" />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label"><FaUsers className="me-2" />Number of Travelers *</label>
                        <Field
                          type="number"
                          name="travelers"
                          className="form-control"
                          min="1"
                          max="10"
                        />
                        <ErrorMessage name="travelers" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Special Requests (Optional)</label>
                      <Field
                        as="textarea"
                        name="specialRequests"
                        className="form-control"
                        rows="3"
                        placeholder="Any special requirements or preferences..."
                      />
                    </div>

                    {packageData.price && (
                      <div className="alert alert-success">
                        <strong>Total Amount: </strong>
                        ₹{(parseInt(packageData.price.replace(/[₹,]/g, '')) * values.travelers).toLocaleString()}
                        <small className="d-block">({packageData.price} × {values.travelers} travelers)</small>
                      </div>
                    )}

                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="terms" required />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <a href="#!">Terms & Conditions</a> and <a href="#!">Privacy Policy</a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>

                    <p className="text-center text-muted small mt-3 mb-0">
                      🔒 Your information is safe and secure with us
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;