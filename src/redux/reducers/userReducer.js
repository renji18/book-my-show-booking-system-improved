import * as actionType from "../actions/actionTypes"

export const userData = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_SINGLE_USER:
      return {
        ...state,
        profile: action.data,
      }
    case actionType.GET_ALL_TICKETS:
      return {
        ...state,
        tickets: action.data,
      }
    case actionType.SELECT_SEATS_FOR_PAYMENT:
      return {
        ...state,
        seatData: {
          movie: action.movieName,
          seats: action.selectedSeats,
          price: action.price,
        },
      }
    default:
      return state
  }
}
