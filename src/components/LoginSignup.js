import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFirebase } from "../server"
import { useSelector } from "react-redux"

const LoginSignup = ({ toggleOverlay }) => {
  const firebase = useFirebase()
  const navigate = useNavigate()
  const { profile } = useSelector((state) => state?.userData)

  const [continueWithEmail, setContinueWithEmail] = useState(false)
  const [signUpOrIn, setSignUpOrIn] = useState("IN")
  const [showPasswords, setShowPasswords] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const changeMethod = (method) => {
    setData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    })
    setSignUpOrIn(method)
  }

  const proceed = () => {
    const { email, password, confirmPassword, name } = data
    if (!email || !password) {
      return window.alert("Please fill in your email and password correctly")
    }
    if (signUpOrIn === "IN") {
      firebase.signInUser(email, password)
      toggleOverlay()
      navigate("/")
    } else {
      if (!confirmPassword || confirmPassword !== password || !name) {
        return window.alert("Please fill all your details correctly")
      }
      firebase.signUpUser(email, password, name)
      toggleOverlay()
      navigate("/")
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = "scroll")
  })

  const signOut = () => {
    firebase.signOutUser()
    toggleOverlay()
    navigate("/")
  }

  return (
    <>
      <div className="fixed z-50 bg-black/95 flex justify-center items-center h-screen w-screen">
        <div
          className="h-screen w-screen absolute"
          onClick={toggleOverlay}
        ></div>
        {profile ? (
          <div
            className="absolute cursor-pointer -mt-14 px-6 py-3 rounded-md right-[90px] bg-white top-0"
            onClick={signOut}
          >
            Sign Out
          </div>
        ) : (
          <div className="modal-content relative py-20">
            <div className="flex justify-center text-xl">
              <p>Get Started</p>
              <span
                className="absolute cursor-pointer border px-3 py-1 bg-black text-white rounded-full -top-4 -right-6"
                onClick={toggleOverlay}
                title="Close"
              >
                X
              </span>
            </div>

            {!continueWithEmail && (
              <div className="container mb-20">
                <Link onClick={() => setContinueWithEmail(true)}>
                  <div className="logo">
                    <ion-icon
                      name="mail-outline"
                      style={{ fontSize: "22px", marginTop: "8px" }}
                    ></ion-icon>
                  </div>
                  <div className="text">Continue with Email</div>
                </Link>
              </div>
            )}

            {continueWithEmail && (
              <div className="text-sm flex justify-evenly my-5">
                <button
                  onClick={() => changeMethod("IN")}
                  className={`${signUpOrIn === "IN" && "underline"}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => changeMethod("UP")}
                  className={`${signUpOrIn === "UP" && "underline"}`}
                >
                  Sign Up
                </button>
              </div>
            )}

            {continueWithEmail && (
              <div className="container">
                {signUpOrIn === "UP" && (
                  <div className="flex mb-4 justify-between px-2">
                    <label className="cursor-pointer pt-1" htmlFor="Name">
                      name
                    </label>
                    <input
                      value={data?.name}
                      id="Name"
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      className="border-2 outline-slate-500 rounded px-3 py-1"
                      type="text"
                    />
                  </div>
                )}
                <div className="flex mb-4 justify-between px-2">
                  <label className="cursor-pointer pt-1" htmlFor="Email">
                    email
                  </label>
                  <input
                    value={data?.email}
                    id="Email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="border-2 outline-slate-500 rounded px-3 py-1"
                    type="text"
                  />
                </div>
                <div className="flex mb-4 justify-between px-2">
                  <label className="cursor-pointer pt-1" htmlFor="Password">
                    password
                  </label>
                  <input
                    value={data?.password}
                    id="Password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="border-2 outline-slate-500 rounded px-3 py-1"
                    type={!showPasswords ? "password" : "text"}
                  />
                </div>
                {signUpOrIn === "UP" && (
                  <div className="flex justify-between px-2">
                    <label
                      className="cursor-pointer pt-1"
                      htmlFor="ConfirmPassword"
                    >
                      confirm password
                    </label>
                    <input
                      value={data?.confirmPassword}
                      id="ConfirmPassword"
                      onChange={(e) =>
                        setData({ ...data, confirmPassword: e.target.value })
                      }
                      className="border-2 outline-slate-500 rounded px-3 py-1"
                      type={!showPasswords ? "password" : "text"}
                    />
                  </div>
                )}
                <button
                  onClick={() => setShowPasswords(!showPasswords)}
                  className={`text-sm ${
                    signUpOrIn === "UP" && "mt-5"
                  } border rounded-md px-2 py-1 absolute right-6`}
                >
                  Show Passwords
                </button>
                <button
                  onClick={proceed}
                  className="bg-red-500 py-2 rounded-md mt-16 text-white w-full"
                >
                  {signUpOrIn === "UP" ? "Register" : "Log In"}
                </button>
              </div>
            )}

            <p className="text-center text-sm mt-10">
              I agree to the <u>Terms & Conditions</u> & <u>Privacy Policy</u>
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default LoginSignup
