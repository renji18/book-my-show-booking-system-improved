import React, { useEffect, useState } from "react"
import Slider from "../components/Slider"
import Movies from "../components/Movies"
import FooterStripe from "../components/FooterStripe"
import { useFirebase } from "../server"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../server/config"
import { handleAuthStateChange } from "../server/utility"
import { useDispatch } from "react-redux"

const Home = () => {
  const firebase = useFirebase()
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.selectSeats()
  }, [])

  // states
  const [user, setUser] = useState(null)

  // useEffect to catch logins, registrations and logouts
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (data) =>
      handleAuthStateChange(data, dispatch, setUser)
    )
  }, [dispatch])

  return (
    <>
      <Slider />
      <Movies />
      <FooterStripe />
    </>
  )
}

export default Home
