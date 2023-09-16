import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Failed from "../assets/fail.png"
import { useFirebase } from "../server"

export default function FailPage() {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const state = useLocation()

  const [counter, setCounter] = useState(10)

  useEffect(() => {
    setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)
  }, [])

  useEffect(() => {
    firebase.selectSeats()
  }, [])

  useEffect(() => {
    if (counter === 0) {
      navigate("/")
    }
  }, [counter, navigate])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center -mt-40 p-[20px] transform ease-in-out duration-[300ms] cursor-pointer hover:scale-105">
        <div className="failed_img">
          <img src={Failed} alt="" />
        </div>
        <h2 className="text-[24px]">Payment Failed</h2>
        <p className="max-w-[50vw] leading-7 capitalize mt-[10px] text-[16px]">
          {state?.state?.message && state?.state?.message === "queue failure"
            ? "You are out of queue now, someone ahead of you bought the ticket, or you lost your window to buy the ticket"
            : "OOPS!!! Looks like your payment could not be processed."}
        </p>
        <p className="capitalize mt-[10px] text-[18px]">
          Redirecting to home page in {counter}...
        </p>
      </div>
    </div>
  )
}
