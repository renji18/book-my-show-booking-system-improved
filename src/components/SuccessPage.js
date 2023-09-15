import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../server"

export default function SuccessPage() {
  const navigate = useNavigate()
  const { seatData, profile } = useSelector((state) => state?.userData)
  // const { movie, seats, price } = seatData

  const [counter, setCounter] = useState(5)

  useEffect(() => {
    setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)
  }, [])

  const createSeatsData = () => {
    let seatsString = ""
    seatData?.seats.map((seat) => {
      return (seatsString += `${seat}, `)
    })
    seatsString = seatsString.slice(0, -2)
    return seatsString
  }

  useEffect(() => {
    counter === 0 && navigate("/")
  }, [counter, navigate])

  return (
    <div>
      <div className="text-center flex flex-col mt-20 items-center">
        <div className="my-[20px]">
          <div className="bg-[#4caf50] text-[#fff] p-[10px] rounded-[5px] inline-block">
            Payment Successful!
          </div>
        </div>
        <div className="movie-ticket max-w-max">
          <h3 className="mt-0">Movie Ticket</h3>
          <table className="w-full border-collapse mt-[10px]">
            <tbody>
              <tr>
                <td className="p-[8px] text-left">Movie:</td>
                <td className="p-[8px] text-left">
                  {seatData && seatData?.movie}
                </td>
              </tr>
              <tr>
                <td className="p-[8px] text-left">Date:</td>
                <td className="p-[8px] text-left">September 15, 2023</td>
              </tr>
              <tr>
                <td className="p-[8px] text-left">Time:</td>
                <td className="p-[8px] text-left">7:00 PM</td>
              </tr>
              <tr>
                <td className="p-[8px] text-left">Theater:</td>
                <td className="p-[8px] text-left">AMC Cinema</td>
              </tr>
              <tr>
                <td className="p-[8px] text-left">Seat:</td>
                <td className="p-[8px] text-left">{createSeatsData()}</td>
              </tr>
              <tr>
                <td className="p-[8px] text-left">Price:</td>
                <td className="p-[8px] text-left">
                  ₹{seatData && seatData?.price}.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className=" mt-[10px] text-[18px]">
          Redirecting to home page in {counter}...
        </p>
      </div>
    </div>
  )
}
