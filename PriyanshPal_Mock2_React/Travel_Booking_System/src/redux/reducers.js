import { ADD_BOOKING, UPDATE_BOOKING_STATUS, DELETE_BOOKING } from './actions';

const initialState = {
  bookings: [],
  totalBookings: 0
};

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        totalBookings: state.totalBookings + 1
      };

    case UPDATE_BOOKING_STATUS:
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, status: action.payload.status }
            : booking
        )
      };

    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload),
        totalBookings: state.totalBookings - 1
      };

    default:
      return state;
  }
}

export default bookingReducer;