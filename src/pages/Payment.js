import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useFirebase } from "../server"
import { toast } from "react-toastify"

export default function Payment() {
  const navigate = useNavigate()
  const state = useLocation()
  const firebase = useFirebase()

  const [filteredSeats, setFilteredSeats] = useState([])

  const [justBoughtBySomeone, setJustBoughtBySomeone] = useState(false)
  const [isBuyingSeats, setIsBuyingSeats] = useState(true)
  const [isSessionSeats, setIsSessionSeats] = useState(true)

  const [moveOnHandler, setMoveOnHandler] = useState(0)

  const [nthInQueue, setNthInQueue] = useState(0)

  const { seatData, profile, tickets } = useSelector((state) => state?.userData)

  setTimeout(() => {
    setMoveOnHandler(101)
  }, 5000)

  // useEffect to update cancellation of previous person
  useEffect(() => {
    const setFilteredSeatsFunction = () => {
      if (!tickets) return
      const movieTicket = tickets?.filter(
        (t) => t?.title === seatData?.movie
      )[0]
      const sessionData = movieTicket?.session
      const stateSelectedSeats = state?.state?.filteredSeats?.map(
        (obj) => Object.keys(obj)[0]
      )
      const filteredArr = sessionData?.filter((obj) =>
        stateSelectedSeats?.includes(obj?.seat)
      )
      setFilteredSeats(filteredArr)
    }
    setFilteredSeatsFunction()
  }, [tickets, state?.state?.filteredSeats])

  const buyingSeats = () => {
    let seatsString = ""
    filteredSeats?.map((fs) => {
      if (fs["session"].length > 0) {
        const sessionData = fs["session"][0]
        if (sessionData?.email === profile?.email) {
          seatsString += `${fs?.seat}, `
        }
      } else {
        seatsString += `${fs?.seat}, `
      }
    })
    seatsString = seatsString.slice(0, -2)
    return seatsString
  }

  const sessionSeats = () => {
    let seatsString = ""
    filteredSeats?.map((fs) => {
      const sessionData = fs["session"][0]
      if (sessionData?.email !== profile?.email) {
        seatsString += `${fs?.seat}, `
      }
    })
    seatsString = seatsString.slice(0, -2)
    return seatsString
  }

  // useEffect to check if ticket was purchased before someone or not
  useEffect(() => {
    const setThisMovieTicketsFunction = () => {
      if (!tickets || !seatData) return
      const thisMovie = tickets?.filter((t) => t?.title === seatData?.movie)[0]
      const confirmedSeats = thisMovie?.confirmed
      const sessionSeatsArray = sessionSeats().split(", ")
      const isBoughtBySomeone = sessionSeatsArray?.every((ele) =>
        confirmedSeats?.includes(ele)
      )
      if (isBoughtBySomeone) {
        setJustBoughtBySomeone(true)
        toast.info("Please try another seat, sorry for the inconvenience")
        toast.info(
          "Looks like someone ahead of you in the queue has bought the ticket."
        )
        // queueBtn()
      }
    }
    setThisMovieTicketsFunction()
  }, [tickets, seatData])

  // useEffect to cancel the session, as the previous person bought the ticket
  useEffect(() => {
    if (filteredSeats?.length === 0 && justBoughtBySomeone) {
      queueBtn()
    } else {
      setJustBoughtBySomeone(false)
    }
  }, [filteredSeats, justBoughtBySomeone])

  // useEffect to cancel the session, as the time limit was over
  useEffect(() => {
    const exceededTimeLimit = () => {
      if (moveOnHandler > 100) {
        const emailExists = filteredSeats?.some((fs) =>
          fs?.session?.some((fss) => fss?.email === profile?.email)
        )
        if (!emailExists) {
          queueBtn()
        }
      }
    }
    exceededTimeLimit()
  }, [filteredSeats, profile?.email, moveOnHandler])

  const handleClikBtn = (btn) => {
    if (btn === "success") {
      firebase.buyTickets({
        title: seatData?.movie,
        seats: buyingSeats().split(", "),
        price: seatData?.price,
      })
      navigate("/success")
    } else {
      const newSeatData = { ...seatData, seats: buyingSeats().split(", ") }
      firebase.cancelTicketBooking(newSeatData)
      // firebase.selectSeats()
      navigate("/fail")
    }
  }

  const queueBtn = () => {
    const newSeatData = { ...seatData, seats: sessionSeats().split(", ") }
    firebase.cancelTicketBooking(newSeatData)
    // firebase.selectSeats()
    navigate("/fail", {
      state: {
        message: "queue failure",
      },
    })
  }

  return (
    <div className="w-full h-screen m-0 p-0 bg-[#f2f2f2]">
      <header className="w-full py-3 bg-[#1f2533] shadow-[0_0_30px_rgb(40,47,65)]">
        <div className="flex h-full items-center justify-center">
          <span className="text-white text-[1.1rem]">{seatData?.movie}</span>
        </div>
      </header>
      {sessionSeats().length > 0 && <div>People before you: {nthInQueue}</div>}
      {buyingSeats().length > 0 && (
        <div className="relative flex-col flex items-center justify-around top-20 ">
          <div className="box-border relative bg-white float-right h-[414px]  flex flex-col items-start shadow-[0_0_2px_rgb(128,128,128)] px-[25px] py-[30px]">
            <h2 className="w-full text-left font-sans font-light uppercase mb-[20px] text-[0.8rem]">
              Booking summary
            </h2>

            <div className="w-full flex gap-10 items-center justify-between my-[7px]">
              <span className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]">
                Seats - {buyingSeats()}
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
      )}

      {sessionSeats().length > 0 && (
        <div className="relative mt-10 flex-col flex items-center justify-around top-20 ">
          <div className="box-border relative bg-white float-right  flex flex-col items-start shadow-[0_0_2px_rgb(128,128,128)] px-[25px] py-[30px]">
            <h2 className="w-full text-left font-sans font-light uppercase mb-[20px] text-[0.8rem]">
              Queued for
            </h2>

            <div className="w-full flex gap-10 items-center justify-between my-[7px]">
              <span className="text-[14px] inline-block pt-[8px] leading-[18px] text-[#272626]">
                Seats - {sessionSeats()}
              </span>
            </div>

            <div className="w-full gap-5 items-center justify-around flex">
              <div
                className="h-[50px] ml-[170px] mt-5 w-[150px] rounded-[10px] text-[1rem] text-white flex items-center cursor-pointer justify-center bg-[#d93333] hover:bg-[#f91212]"
                onClick={queueBtn}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
