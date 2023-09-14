import * as actionType from "./actionTypes"

// Getting single user data after login or registration
export const getSingleUser = (data) => {
  return {
    type: actionType.GET_SINGLE_USER,
    data,
  }
}

// Main loader on route changes
export const toggleMainLoader = (data) => ({
  type: actionType.MAIN_LOADER,
  data,
})

// Loader for firebase functions
export const toggleFirebaseLoader = (data) => ({
  type: actionType.FIREBASE_LOADER,
  data,
})

// Register and Login user
export const registerLoginSignOutUser = (
  method,
  profile,
  email,
  password,
  dispatch,
  name
) => ({
  type: actionType.REGISTER_LOGIN_SIGNOUT_USER,
  method,
  profile,
  email,
  password,
  dispatch,
  name,
})

// Select seats for payment
export const selectSeatsForPayment = (
  profile,
  movieName,
  selectedSeats,
  price
) => ({
  type: actionType.SELECT_SEATS_FOR_PAYMENT,
  profile,
  movieName,
  selectedSeats,
  price,
})

// buy tickets
export const buyTicketsAction = (profile, ticketsData) => ({
  type: actionType.BUY_TICKETS,
  profile,
  ticketsData,
})

// get all tickets
export const getAllTickets = (data) => ({
  type: actionType.GET_ALL_TICKETS,
  data,
})

// cancel seats
export const cancelSeatTicket = (profile, seatData) => ({
  type: actionType.CANCEL_SEATS,
  profile,
  seatData,
})
