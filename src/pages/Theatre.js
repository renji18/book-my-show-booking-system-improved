import React, { useEffect, useState } from "react"
import TheatreInfo from "../components/TheatreInfo"
import Screen from "../assets/eyes_here.png"
import BMS from "../assets/bms.png"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFirebase } from "../server"

const Theatre = () => {
  const state = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const { profile, seatData, tickets } = useSelector((state) => state?.userData)
  const { title, image, cast } = state?.state

  const [seatArrangement, setSeatArrangement] = useState([
    [
      { p1: false, available: true },
      { p2: false, available: true },
      { p3: false, available: true },
      { p4: false, available: true },
      { p5: false, available: true },
      { p6: false, available: true },
      { p7: false, available: true },
      { p8: false, available: true },
      { p9: false, available: true },
    ],
    [
      { a1: false, available: true },
      { a2: false, available: true },
      { a3: false, available: true },
      { a4: false, available: true },
      { a5: false, available: true },
      { a6: false, available: true },
      { a7: false, available: true },
      { a8: false, available: true },
      { a9: false, available: true },
      { a10: false, available: true },
    ],
    [
      { b1: false, available: true },
      { b2: false, available: true },
      { b3: false, available: true },
      { b4: false, available: true },
      { b5: false, available: true },
      { b6: false, available: true },
      { b7: false, available: true },
      { b8: false, available: true },
      { b9: false, available: true },
      { b10: false, available: true },
    ],
    [
      { c1: false, available: true },
      { c2: false, available: true },
      { c3: false, available: true },
      { c4: false, available: true },
      { c5: false, available: true },
      { c6: false, available: true },
      { c7: false, available: true },
      { c8: false, available: true },
      { c9: false, available: true },
      { c10: false, available: true },
    ],
    [
      { d1: false, available: true },
      { d2: false, available: true },
      { d3: false, available: true },
      { d4: false, available: true },
      { d5: false, available: true },
      { d6: false, available: true },
      { d7: false, available: true },
      { d8: false, available: true },
      { d9: false, available: true },
      { d10: false, available: true },
    ],
    [
      { e1: false, available: true },
      { e2: false, available: true },
      { e3: false, available: true },
      { e4: false, available: true },
      { e5: false, available: true },
      { e6: false, available: true },
      { e7: false, available: true },
      { e8: false, available: true },
      { e9: false, available: true },
      { e10: false, available: true },
    ],
    [
      { f1: false, available: true },
      { f2: false, available: true },
      { f3: false, available: true },
      { f4: false, available: true },
      { f5: false, available: true },
      { f6: false, available: true },
      { f7: false, available: true },
      { f8: false, available: true },
      { f9: false, available: true },
      { f10: false, available: true },
    ],
    [
      { a11: false, available: true },
      { a12: false, available: true },
    ],
    [
      { b11: false, available: true },
      { b12: false, available: true },
    ],
    [
      { c11: false, available: true },
      { c12: false, available: true },
    ],
    [
      { d11: false, available: true },
      { d12: false, available: true },
    ],
    [
      { e11: false, available: true },
      { e12: false, available: true },
    ],
    [
      { f11: false, available: true },
      { f12: false, available: true },
    ],
    [
      { g1: false, available: true },
      { g2: false, available: true },
      { g3: false, available: true },
      { g4: false, available: true },
      { g5: false, available: true },
    ],
    [
      { h1: false, available: true },
      { h2: false, available: true },
      { h3: false, available: true },
      { h4: false, available: true },
      { h5: false, available: true },
    ],
    [
      { g6: false, available: true },
      { g7: false, available: true },
      { g8: false, available: true },
      { g9: false, available: true },
      { g10: false, available: true },
      { g11: false, available: true },
      { g12: false, available: true },
      { g13: false, available: true },
      { g14: false, available: true },
      { g15: false, available: true },
      { g16: false, available: true },
    ],
    [
      { h6: false, available: true },
      { h7: false, available: true },
      { h8: false, available: true },
      { h9: false, available: true },
      { h10: false, available: true },
      { h11: false, available: true },
      { h12: false, available: true },
      { h13: false, available: true },
      { h14: false, available: true },
      { h15: false, available: true },
      { h16: false, available: true },
    ],
    [
      { i1: false, available: true },
      { i2: false, available: true },
      { i3: false, available: true },
      { i4: false, available: true },
      { i5: false, available: true },
    ],
    [
      { j1: false, available: true },
      { j2: false, available: true },
      { j3: false, available: true },
      { j4: false, available: true },
      { j5: false, available: true },
    ],
    [
      { i6: false, available: true },
      { i7: false, available: true },
      { i8: false, available: true },
      { i9: false, available: true },
      { i10: false, available: true },
      { i11: false, available: true },
      { i12: false, available: true },
      { i13: false, available: true },
      { i14: false, available: true },
      { i15: false, available: true },
      { i16: false, available: true },
    ],
    [
      { j6: false, available: true },
      { j7: false, available: true },
      { j8: false, available: true },
      { j9: false, available: true },
      { j10: false, available: true },
      { j11: false, available: true },
      { j12: false, available: true },
      { j13: false, available: true },
      { j14: false, available: true },
      { j15: false, available: true },
      { j16: false, available: true },
    ],
  ])

  const [selectedSeats, setSelectedSeats] = useState([])

  const [count, setCount] = useState(0)
  const [totalPrice, setPrice] = useState(0)

  // function to select seats
  const select = (seat, midLevel, innerLevel, price) => {
    let updatedSeatingArrangement = Array.from(seatArrangement)
    const data = updatedSeatingArrangement[midLevel][innerLevel]

    if (!data["available"]) return
    const prevValue = data[seat]
    updatedSeatingArrangement[midLevel][innerLevel][seat] = !prevValue
    setSeatArrangement(updatedSeatingArrangement)
    if (prevValue) {
      const filteredVals = selectedSeats.filter((s) => s !== seat)
      setSelectedSeats(filteredVals)
      setPrice((prev) => prev - price)
    } else {
      setSelectedSeats((prev) => [...prev, seat])
      setPrice((prev) => prev + price)
    }
  }

  // useEffect to mark already booked seats
  useEffect(() => {
    const markBooked = () => {
      
    }
    markBooked()
  }, [tickets])

  // useEffect to re select the seats selected previously and if the user goes back to the seat selection page
  useEffect(() => {
    const sessionSelectedSeats = () => {
      if (seatData?.movie !== title) return
      const seatArrangementRef = Array.from(seatArrangement)
      const subSet = new Set(seatData?.seats)

      for (const seats of seatArrangementRef) {
        for (const obj of seats) {
          const key = Object.keys(obj)[0]

          if (subSet.has(key)) {
            obj[key] = true
          }
        }
      }
      setSelectedSeats([...seatData?.seats])
      setPrice(seatData?.price)
      setSeatArrangement(seatArrangementRef)
    }
    sessionSelectedSeats()
  }, [])

  // useEffect to count the number of seats selected
  useEffect(() => {
    const countTrueKeys = () => {
      const totalCount = seatArrangement
        .map((innerArr) =>
          innerArr.reduce((acc, obj) => {
            for (const key in obj) {
              if (obj[key] === true) {
                acc++
              }
            }
            return acc
          }, 0)
        )
        .reduce((acc, count) => acc + count, 0)
      setCount(totalCount)
    }
    countTrueKeys()
  }, [seatArrangement])

  // function to convert the object keys and values into elements of array
  const convertToArr = (arrayOfObjects) => {
    let arr = arrayOfObjects.map((obj) => {
      const resultArr = []
      for (const key in obj) {
        resultArr.push(key, obj[key])
      }
      return resultArr
    })
    return arr
  }

  // function to select a part of the array for different section of seats
  const getSeatsArray = (start, end) => {
    const premiumArrays = Array.from(seatArrangement).slice(start, end)
    return premiumArrays
  }

  // function to proceed with the payment
  const proceed = () => {
    firebase.selectSeats(title, selectedSeats, totalPrice)
    navigate("/payment")
  }

  return (
    <div>
      <div>
        <TheatreInfo image={image} cast={cast} title={title} count={count} />
        <div className="theatre_seating grid justify-center">
          <div className="recliner">
            <div className="sear_area_name">RC - Rs. 200</div>
            <hr />
            <div className=" flex justify-center mt-2">
              <div className="flex justify-center gap-5">
                {convertToArr(seatArrangement[0]).map((item, index) => (
                  <div
                    className={`grid-item  ${item[1] && "selectedSeat"} ${
                      !item[3] && "bg-gray-400 text-white"
                    } ${item[3] && "text-[#50ac82]"}`}
                    title={!item[3] ? "booked" : undefined}
                    key={index}
                    onClick={() => {
                      select(item[0], 0, index, 200)
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="premium">
            <div className="seat_area_name">Premium - Rs. 180</div>
            <hr />
            <div className="premium_grps">
              <div className="p_grp_1">
                <div className="grid-container_2">
                  {getSeatsArray(1, 7).map((item, index) =>
                    convertToArr(item).map((it, index2) => (
                      <div
                        className={`grid-item  ${it[1] && "selectedSeat"} ${
                          !it[3] && "bg-gray-400 text-white"
                        } ${it[3] && "text-[#50ac82]"}`}
                        title={!it[3] ? "booked" : undefined}
                        key={index2}
                        onClick={() => {
                          select(it[0], index + 1, index2, 180)
                        }}
                      >
                        {index2 + 1}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="p_grp_2">
                <div className="grid-container_3">
                  {getSeatsArray(7, 13).map((item, index) =>
                    convertToArr(item).map((it, index2) => (
                      <div
                        className={`grid-item  ${it[1] && "selectedSeat"} ${
                          !it[3] && "bg-gray-400 text-white"
                        } ${it[3] && "text-[#50ac82]"}`}
                        title={!it[3] ? "booked" : undefined}
                        key={index2}
                        onClick={() => {
                          select(it[0], index + 7, index2, 180)
                        }}
                      >
                        1{index2 + 1}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="premium_down_grps">
              <div className="premium_dgrp_1">
                <div className="grid-container_4">
                  {getSeatsArray(13, 15).map((item, index) =>
                    convertToArr(item).map((it, index2) => (
                      <div
                        className={`grid-item  ${it[1] && "selectedSeat"} ${
                          !it[3] && "bg-gray-400 text-white"
                        } ${it[3] && "text-[#50ac82]"}`}
                        title={!it[3] ? "booked" : undefined}
                        key={index2}
                        onClick={() => {
                          select(it[0], index + 13, index2, 180)
                        }}
                      >
                        {index2 + 1}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="premium_dgrp_2">
                <div className="grid-container_5">
                  {getSeatsArray(15, 17).map((item, index) =>
                    convertToArr(item).map((it, index2) => (
                      <div
                        className={`grid-item  ${it[1] && "selectedSeat"} ${
                          !it[3] && "bg-gray-400 text-white"
                        } ${it[3] && "text-[#50ac82]"}`}
                        title={!it[3] ? "booked" : undefined}
                        key={index2}
                        onClick={() => {
                          select(it[0], index + 15, index2, 180)
                        }}
                      >
                        {index2 + 6}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="executive">
            <div className="seat_area_name">Executive - Rs. 150</div>
            <hr />
            <div className="premium_down_grps">
              <div className="premium_dgrp_1">
                <div className="grid-container_4">
                  {getSeatsArray(17, 19).map((item, index) =>
                    convertToArr(item).map((it, index2) => (
                      <div
                        className={`grid-item  ${it[1] && "selectedSeat"} ${
                          !it[3] && "bg-gray-400 text-white"
                        } ${it[3] && "text-[#50ac82]"}`}
                        title={!it[3] ? "booked" : undefined}
                        key={index2}
                        onClick={() => {
                          select(it[0], index + 17, index2, 150)
                        }}
                      >
                        {index2 + 1}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="premium_dgrp_2">
                <div className="grid-container_5">
                  {getSeatsArray(19, 21).map((item, index) =>
                    convertToArr(item).map((it, index2) => (
                      <div
                        className={`grid-item  ${it[1] && "selectedSeat"} ${
                          !it[3] && "bg-gray-400 text-white"
                        } ${it[3] && "text-[#50ac82]"}`}
                        title={!it[3] ? "booked" : undefined}
                        key={index2}
                        onClick={() => {
                          select(it[0], index + 19, index2, 150)
                        }}
                      >
                        {index2 + 6}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="screen mb-[50px] flex justify-center">
            <img src={Screen} alt="screen" />
          </div>
          {totalPrice !== 0 && (
            <div className="price_div">
              <img src={BMS} alt="" />
              <div className="price_info">Total - Rs. {totalPrice}</div>
              <div className="proceed">
                <button onClick={proceed} className="proceed_button">
                  PROCEED
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Theatre
