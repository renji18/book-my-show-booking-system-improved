import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useFirebase } from "../server"

export default function Payment() {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const { seatData, profile } = useSelector((state) => state?.userData)
  // const { movie, seats, price } = seatData

  const createSeatsData = () => {
    let seatsString = ""
    seatData?.seats.map((seat) => {
      return (seatsString += `${seat}, `)
    })
    seatsString = seatsString.slice(0, -2)
    return seatsString
  }

  const handleClikBtn = (btn) => {
    if (btn === "success") {
      firebase.buyTickets({
        title: seatData?.movie,
        seats: seatData?.seats,
        price: seatData?.price,
      })
      navigate("/success")
    } else {
      firebase.selectSeats()
      navigate("/fail")
    }
  }
  return (
    <div className="w-full h-screen m-0 p-0 bg-[#f2f2f2]">
      <header className="w-full py-3 bg-[#1f2533] shadow-[0_0_30px_rgb(40,47,65)]">
        <div className="flex h-full items-center justify-center">
          <span className="text-white text-[1.1rem]">{seatData?.movie}</span>
        </div>
      </header>
      <div className="relative flex-col flex items-center justify-around top-20 ">
        <div className="box-border relative bg-white float-right h-[414px]  flex flex-col items-start shadow-[0_0_2px_rgb(128,128,128)] px-[25px] py-[30px]">
          <h2 className="w-full text-left font-sans font-light uppercase mb-[20px] text-[0.8rem]">
            Booking summary
          </h2>

          <div className="w-full flex gap-10 items-center justify-between my-[7px]">
            <span className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]">
              Seats - {createSeatsData()}
            </span>
            <span className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]">
              Rs. {seatData?.price}.00
            </span>
          </div>

          <div className="w-full flex items-center justify-between my-[7px]">
            <span
              style={{
                fontSize: 12 + "px",
                fontFamily: "monospace",
                letterSpacing: 0.01 + " rem",
                fontWeight: "normal",
              }}
            >
              {" "}
              Convenience fees
            </span>
            <span
              className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]"
              style={{ textTransform: "capitalize" }}
            >
              Rs. 68.00
            </span>
          </div>

          <hr style={{ width: 100 + "%", backgroundColor: "#e2d2d2" }} />

          <div className="w-full flex items-center justify-between my-[7px]">
            <span
              className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]"
              style={{ fontSize: 13 + "px" }}
            >
              Sub Total
            </span>
            <span
              className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]"
              style={{ fontWeight: 500, textTransform: "capitalize" }}
            >
              Rs. {68 + seatData?.price}.00
            </span>
          </div>

          <div className="w-full mt-28 gap-5 items-center justify-around flex">
            <div
              className="h-[50px] w-[150px] rounded-[10px] text-[1rem] text-white flex items-center cursor-pointer justify-center bg-[#d93333] hover:bg-[#f91212]"
              onClick={() => {
                handleClikBtn("fail")
              }}
            >
              Cancel
            </div>

            <div
              className="h-[50px] w-[150px] rounded-[10px] text-[1rem] text-white flex items-center cursor-pointer justify-center bg-[#33d93e] hover:bg-[#10ff20]"
              onClick={() => {
                handleClikBtn("success")
              }}
            >
              Confirm
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
