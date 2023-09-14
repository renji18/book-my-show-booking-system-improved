import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { firebaseAuth, firestore, storage } from "./config"
import { errorHandler } from "./authErrors"
import { getSingleUser } from "../redux/actions"
import { toast } from "react-toastify"

// handle auth state change function
export async function handleAuthStateChange(data, dispatch, setUser) {
  try {
    if (data) {
      const docSnap = await getSingleDoc("users", data?.uid)
      if (docSnap?.exists()) {
        dispatch(getSingleUser(docSnap?.data()))
        setUser(data)
      } else {
        dispatch(getSingleUser(null))
      }
    } else {
      dispatch(getSingleUser(null))
      setUser(null)
    }
  } catch (error) {
    return errorHandler(error)
  }
}

// returns instance of a single document
export async function getSingleDoc(coll, id) {
  try {
    const docRef = doc(firestore, coll, id)
    const docSnap = await getDoc(docRef)
    return docSnap
  } catch (error) {
    errorHandler(error)
  }
}

// returns snap array of any operation in a document
export async function getSnapOfDocs(coll, key, operation, value) {
  try {
    const ref = collection(firestore, coll)
    const q = query(ref, where(key, operation, value))
    const snap = await getDocs(q)
    return snap
  } catch (error) {
    errorHandler(error)
  }
}

// handle user registration
export async function handleRegistration(profile, email, password, name) {
  try {
    if (profile !== null) {
      return toast?.info(
        "A user is already signed in, try logging out before signing up a new user"
      )
    }
    const snap = await getSnapOfDocs("users", "email", "==", email)
    if (!snap?.empty) {
      return toast?.info(
        "Your account is already registered, please try logging in."
      )
    }
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )

    await setDoc(doc(firestore, "users", res?.user?.uid), {
      email,
      name,
      uid: res?.user?.uid,
      tickets: [],
    })
    toast?.success("Account registered successfully.")
  } catch (error) {
    console?.log(error)
    return errorHandler(error)
  }
}

// handle user sign in
export async function handleSignIn(dispatch, profile, email, password) {
  try {
    if (profile !== null) {
      return toast?.info("A user is already signed in, try logging out first")
    }
    const snap = await getSnapOfDocs("users", "email", "==", email)
    if (snap?.empty) {
      return toast?.warn(
        "Your account is not registered, please register yourself."
      )
    }
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const docSnap = await getSingleDoc("users", res?.user?.uid)
    dispatch(getSingleUser(docSnap?.data()))
    toast?.success("Logged in successfully.")
  } catch (error) {
    return errorHandler(error)
  }
}

// handle user sign out
export async function hanldeSignOut(profile) {
  try {
    if (profile === null) {
      return toast?.warn("You are already signed out")
    } else {
      await signOut(firebaseAuth)
    }
    if (profile !== "forced signout") toast?.success("Signed out successfully.")
  } catch (error) {
    return errorHandler(error)
  }
}

// handle buy tickets
export async function handleBuyTickets(profile, ticketsData) {
  try {
    if (profile === null) return toast?.warn("Please sign in first")

    const snap = await getSnapOfDocs(
      "tickets",
      "title",
      "==",
      ticketsData?.title
    )

    if (snap?.empty) {
      await setDoc(doc(firestore, "tickets", ticketsData?.title), {
        title: ticketsData?.title,
        confirmed: ticketsData?.seats,
        boughtBy: profile?.email,
      })
    } else {
      const docSnap = await getSingleDoc("tickets", ticketsData?.title)
      const snapData = docSnap?.data()
      const docRef = doc(firestore, "tickets", ticketsData?.title)

      const sessionData = snapData?.session

      const updatedSessionData = sessionData?.filter(
        (obj) => !ticketsData?.seats?.includes(obj?.seat)
      )

      await updateDoc(docRef, {
        confirmed: [...snapData?.confirmed, ...ticketsData?.seats],
        session: updatedSessionData,
      })
    }

    const userSnap = await getSingleDoc("users", profile?.uid)
    const userData = userSnap?.data()
    const userRef = doc(firestore, "users", profile?.uid)

    await updateDoc(userRef, {
      tickets:
        userData?.tickets?.length > 0
          ? [...userData?.tickets, ticketsData]
          : [ticketsData],
    })

    return toast?.success("Tickets booked successfully.")
  } catch (error) {
    return errorHandler(error)
  }
}

// handle starting session
export async function handleStartBookingSession(
  profile,
  movieName,
  selectedSeats,
  price
) {
  try {
    if (profile === null) return toast?.warn("Please sign in first")

    let docSnap = await getSingleDoc("tickets", movieName)
    let snapData = docSnap?.data()
    const docRef = doc(firestore, "tickets", movieName)

    let inSession = snapData?.session
    if (inSession && inSession?.length > 0) {
      const prevSessionSelected = inSession?.filter((sess) =>
        selectedSeats?.includes(sess?.seat)
      )

      const untouchedData = inSession?.filter(
        (sess) => !selectedSeats?.includes(sess?.seat)
      )

      const unRequiredPreviousSessions = prevSessionSelected?.filter((item) => {
        return item.session.some(
          (innterItem) => innterItem.email === profile?.email
        )
      })

      const requiredPreviousSessions = prevSessionSelected?.filter((item) => {
        return !item.session.some(
          (innterItem) => innterItem.email === profile?.email
        )
      })

      const creatingPrevSessionSeatsData = requiredPreviousSessions?.map(
        (prev) => {
          return {
            seat: prev.seat,
            session: [
              ...prev.session,
              { email: profile.email, time: Date.now() },
            ],
          }
        }
      )

      const newSessions = selectedSeats.filter(
        (key) => !inSession.some((obj) => obj.seat === key)
      )

      const newSessionsSeats = newSessions?.map((s) => {
        return {
          seat: s,
          session: [{ email: profile?.email, time: Date.now() }],
        }
      })

      await updateDoc(docRef, {
        session: [
          ...untouchedData,
          ...unRequiredPreviousSessions,
          ...creatingPrevSessionSeatsData,
          ...newSessionsSeats,
        ],
      })

      docSnap = await getSingleDoc("tickets", movieName)
      snapData = docSnap?.data()
      inSession = snapData?.session

      const fullQueue = inSession
        .filter((item) => item?.session?.length === 3)
        .map((item) => item.seat)

      await updateDoc(docRef, {
        confirmed: [...snapData?.confirmed, ...fullQueue],
      })
    } else {
      const sessionStarter = selectedSeats?.map((s) => {
        return {
          seat: s,
          session: [{ email: profile?.email, time: Date.now() }],
        }
      })
      await updateDoc(docRef, {
        session: sessionStarter,
      })
    }
  } catch (error) {
    return errorHandler(error)
  }
}

// handle cancel booking session
export async function handleCancelTicketsSession(profile, seatData) {
  try {
    if (profile === null) return toast?.warn("Please sign in first")

    const { movie, seats, price } = seatData

    let docSnap = await getSingleDoc("tickets", movie)
    let snapData = docSnap?.data()
    const docRef = doc(firestore, "tickets", movie)

    let inSession = snapData?.session

    const booked = snapData?.confirmed

    const prevSessionSelected = inSession?.filter((sess) =>
      seats?.includes(sess?.seat)
    )

    const updatedBooked = booked?.filter(
      (seat) => !prevSessionSelected?.some((obj) => obj?.seat === seat)
    )

    const untouchedData = inSession?.filter(
      (sess) => !seats?.includes(sess?.seat)
    )

    const updatedPrevSession = prevSessionSelected?.map((prevSess) => {
      return {
        seat: prevSess?.seat,
        session: prevSess?.session?.filter(
          (innerObj) => innerObj?.email !== profile?.email
        ),
      }
    })

    await updateDoc(docRef, {
      session: [...untouchedData, ...updatedPrevSession],
      confirmed: updatedBooked,
    })
  } catch (error) {
    return errorHandler(error)
  }
}
