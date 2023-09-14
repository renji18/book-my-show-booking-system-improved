import { put, takeEvery } from "redux-saga/effects"
import * as actionType from "../actions/actionTypes"
import * as actionCreators from "../actions"
import {
  handleBuyTickets,
  handleCancelTicketsSession,
  handleRegistration,
  handleSignIn,
  handleStartBookingSession,
  hanldeSignOut,
} from "../../server/utility"

// Simple main api loader
export function* mainLoaderSagaCall(action) {
  yield put(actionCreators.toggleMainLoader(false))
}

// Registration, Login and Signout saga
export function* registerLoginSignOutSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    if (action?.method === "register") {
      yield handleRegistration(
        action?.profile,
        action?.email,
        action?.password,
        action?.name
      )
    } else if (action?.method === "login") {
      yield handleSignIn(
        action?.dispatch,
        action?.profile,
        action?.email,
        action?.password
      )
    } else if (action?.method === "signout") {
      yield hanldeSignOut(action?.profile)
    } else {
      return "NO METHOD FOUND"
    }
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
  }
}

// Buy tickets
export function* buyTicketsSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleBuyTickets(action?.profile, action?.ticketsData)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
  }
}

// session starting for tickets
export function* startSessionForBookingSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleStartBookingSession(
      action?.profile,
      action?.movieName,
      action?.selectedSeats,
      action?.price
    )
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
  }
}

// cancel booking session
export function* cancelBookingSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleCancelTicketsSession(
      action?.profile,
      action?.seatData,
    )
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
  }
}