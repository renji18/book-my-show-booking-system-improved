import { takeLatest } from "redux-saga/effects"
import * as actionTypes from "../actions/actionTypes"
import * as userMiddleware from "./userSaga"

export default function* mySaga() {
  yield takeLatest(
    actionTypes.GET_SINGLE_USER,
    userMiddleware.mainLoaderSagaCall
  )
  yield takeLatest(
    actionTypes.REGISTER_LOGIN_SIGNOUT_USER,
    userMiddleware.registerLoginSignOutSagaCall
  )
  yield takeLatest(actionTypes.BUY_TICKETS, userMiddleware.buyTicketsSagaCall)
  yield takeLatest(
    actionTypes.SELECT_SEATS_FOR_PAYMENT,
    userMiddleware.startSessionForBookingSagaCall
  )
  yield takeLatest(
    actionTypes.CANCEL_SEATS,
    userMiddleware.cancelBookingSagaCall
  )
}
