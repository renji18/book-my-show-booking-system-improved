import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function FailPage() {
  const navigate = useNavigate()
  const [counter, setCounter] = useState(5)

  // useEffect(() => {
  //   setInterval(() => {
  //     setCounter((prev) => prev - 1)
  //   }, 1000)
  // }, [])

  // useEffect(() => {
  //   counter === 0 && navigate("/")
  // }, [counter, navigate])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center -mt-40 p-[20px] bg-[#ff7b7b] rounded-[8px] transform ease-in-out duration-[300ms] cursor-pointer hover:scale-105">
        <h2 className="text-white text-[24px]">Payment Failed</h2>
        <p className="text-white mt-[10px] text-[16px]">
          Your payment could not be processed.
        </p>
        <p className="text-white mt-[10px] text-[18px]">
          {/* Redirecting to home page in {counter}... */}
        </p>
      </div>
    </div>
  )
}
