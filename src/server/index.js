import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { firebaseAuth, firestore } from "./config"
import { handleAuthStateChange } from "./utility"
import {
  buyTicketsAction,
  cancelSeatTicket,
  getAllTickets,
  registerLoginSignOutUser,
  selectSeatsForPayment,
} from "../redux/actions"
import { collection, onSnapshot } from "firebase/firestore"

// firebase context
const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext)

// react component for firebase providation
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state?.userData)

  // states
  const [user, setUser] = useState(null)

  // useEffect to catch logins, registrations and logouts
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (data) =>
      handleAuthStateChange(data, dispatch, setUser)
    )
  }, [dispatch])

  // useEffect to catch changes in tickets collection
  useEffect(() => {
    const ticketChanges = onSnapshot(
      collection(firestore, "tickets"),
      (coll) => {
        let tickets = []
        coll?.docs?.forEach((doc) => {
          tickets?.push(doc?.data())
        })
        dispatch(getAllTickets(tickets))
      }
    )
    return () => ticketChanges()
  }, [dispatch])

  // registration
  const signUpUser = async (email, password, name) => {
    dispatch(
      registerLoginSignOutUser(
        "register",
        profile,
        email,
        password,
        dispatch,
        name
      )
    )
  }

  // sign in
  const signInUser = async (email, password) => {
    dispatch(
      registerLoginSignOutUser("login", profile, email, password, dispatch)
    )
  }

  // singout
  const signOutUser = async () => {
    dispatch(registerLoginSignOutUser("signout", profile))
  }

  // select Seats
  const selectSeats = async (title, selectedSeats, totalPrice) => {
    dispatch(selectSeatsForPayment(profile, title, selectedSeats, totalPrice))
  }

  // buy tickets
  const buyTickets = async (ticketsData) => {
    dispatch(buyTicketsAction(profile, ticketsData))
  }

  // cancel tickets
  const cancelTicketBooking = async (ticketsData) => {
    dispatch(cancelSeatTicket(profile, ticketsData))
  }

  return (
    <FirebaseContext.Provider
      value={{
        signUpUser,
        signInUser,
        signOutUser,
        buyTickets,
        selectSeats,
        cancelTicketBooking,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
