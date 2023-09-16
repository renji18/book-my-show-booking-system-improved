import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../server"
import Ticket from "./Ticket"
import html2pdf from "html2pdf.js"

export default function SuccessPage() {
  const firebase = useFirebase()
  const navigate = useNavigate()
  const { seatData, profile } = useSelector((state) => state?.userData)
  // const { movie, seats, price } = seatData

  const [counter, setCounter] = useState(10)
  const element = document.getElementsByClassName("ticket_img_div")[0]
  const options = {
    filename: "my-document.pdf",
    margin: 0.1,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  }

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
    firebase.selectSeats()
  }, [])

  useEffect(() => {
    if (counter == 7) {
      html2pdf().set(options).from(element).save()
    }
    if (counter === 0) {
      navigate("/")
    }
  }, [counter, navigate])

  return (
    <div>
      <Ticket
        movie_name={seatData && seatData?.movie}
        movie_seats={createSeatsData()}
        movie_price={seatData && seatData?.price}
      />
      <p className=" mt-[10px] text-[18px] red_suc">
        Redirecting to home page in {counter}...
      </p>
    </div>
  )
}
