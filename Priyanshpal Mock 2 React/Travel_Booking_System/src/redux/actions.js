// Action Types
export const ADD_BOOKING = 'ADD_BOOKING';
export const UPDATE_BOOKING_STATUS = 'UPDATE_BOOKING_STATUS';
export const DELETE_BOOKING = 'DELETE_BOOKING';

// Action Creators
export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  payload: {
    ...booking,
    id: Date.now(),
    status: 'Pending',
    bookingDate: new Date().toISOString()
  }
});

export const updateBookingStatus = (id, status) => ({
  type: UPDATE_BOOKING_STATUS,
  payload: { id, status }
});

export const deleteBooking = (id) => ({
  type: DELETE_BOOKING,
  payload: id
});