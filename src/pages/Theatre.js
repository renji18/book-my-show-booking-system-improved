import React, { useEffect, useState } from "react"
import TheatreInfo from "../components/TheatreInfo"
import Screen from "../assets/eyes_here.png"
import BMS from "../assets/bms.png"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFirebase } from "../server"
import { toast } from "react-toastify"

const Theatre = () => {
  const state = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const { profile, seatData, tickets } = useSelector((state) => state?.userData)
  const { title, image, cast } = state?.state

  const [seatArrangement, setSeatArrangement] = useState([
    [
      { p1: false, available: true, session: [] },
      { p2: false, available: true, session: [] },
      { p3: false, available: true, session: [] },
      { p4: false, available: true, session: [] },
      { p5: false, available: true, session: [] },
      { p6: false, available: true, session: [] },
      { p7: false, available: true, session: [] },
      { p8: false, available: true, session: [] },
      { p9: false, available: true, session: [] },
    ],
    [
      { a1: false, available: true, session: [] },
      { a2: false, available: true, session: [] },
      { a3: false, available: true, session: [] },
      { a4: false, available: true, session: [] },
      { a5: false, available: true, session: [] },
      { a6: false, available: true, session: [] },
      { a7: false, available: true, session: [] },
      { a8: false, available: true, session: [] },
      { a9: false, available: true, session: [] },
      { a10: false, available: true, session: [] },
    ],
    [
      { b1: false, available: true, session: [] },
      { b2: false, available: true, session: [] },
      { b3: false, available: true, session: [] },
      { b4: false, available: true, session: [] },
      { b5: false, available: true, session: [] },
      { b6: false, available: true, session: [] },
      { b7: false, available: true, session: [] },
      { b8: false, available: true, session: [] },
      { b9: false, available: true, session: [] },
      { b10: false, available: true, session: [] },
    ],
    [
      { c1: false, available: true, session: [] },
      { c2: false, available: true, session: [] },
      { c3: false, available: true, session: [] },
      { c4: false, available: true, session: [] },
      { c5: false, available: true, session: [] },
      { c6: false, available: true, session: [] },
      { c7: false, available: true, session: [] },
      { c8: false, available: true, session: [] },
      { c9: false, available: true, session: [] },
      { c10: false, available: true, session: [] },
    ],
    [
      { d1: false, available: true, session: [] },
      { d2: false, available: true, session: [] },
      { d3: false, available: true, session: [] },
      { d4: false, available: true, session: [] },
      { d5: false, available: true, session: [] },
      { d6: false, available: true, session: [] },
      { d7: false, available: true, session: [] },
      { d8: false, available: true, session: [] },
      { d9: false, available: true, session: [] },
      { d10: false, available: true, session: [] },
    ],
    [
      { e1: false, available: true, session: [] },
      { e2: false, available: true, session: [] },
      { e3: false, available: true, session: [] },
      { e4: false, available: true, session: [] },
      { e5: false, available: true, session: [] },
      { e6: false, available: true, session: [] },
      { e7: false, available: true, session: [] },
      { e8: false, available: true, session: [] },
      { e9: false, available: true, session: [] },
      { e10: false, available: true, session: [] },
    ],
    [
      { f1: false, available: true, session: [] },
      { f2: false, available: true, session: [] },
      { f3: false, available: true, session: [] },
      { f4: false, available: true, session: [] },
      { f5: false, available: true, session: [] },
      { f6: false, available: true, session: [] },
      { f7: false, available: true, session: [] },
      { f8: false, available: true, session: [] },
      { f9: false, available: true, session: [] },
      { f10: false, available: true, session: [] },
    ],
    [
      { a11: false, available: true, session: [] },
      { a12: false, available: true, session: [] },
    ],
    [
      { b11: false, available: true, session: [] },
      { b12: false, available: true, session: [] },
    ],
    [
      { c11: false, available: true, session: [] },
      { c12: false, available: true, session: [] },
    ],
    [
      { d11: false, available: true, session: [] },
      { d12: false, available: true, session: [] },
    ],
    [
      { e11: false, available: true, session: [] },
      { e12: false, available: true, session: [] },
    ],
    [
      { f11: false, available: true, session: [] },
      { f12: false, available: true, session: [] },
    ],
    [
      { g1: false, available: true, session: [] },
      { g2: false, available: true, session: [] },
      { g3: false, available: true, session: [] },
      { g4: false, available: true, session: [] },
      { g5: false, available: true, session: [] },
    ],
    [
      { h1: false, available: true, session: [] },
      { h2: false, available: true, session: [] },
      { h3: false, available: true, session: [] },
      { h4: false, available: true, session: [] },
      { h5: false, available: true, session: [] },
    ],
    [
      { g6: false, available: true, session: [] },
      { g7: false, available: true, session: [] },
      { g8: false, available: true, session: [] },
      { g9: false, available: true, session: [] },
      { g10: false, available: true, session: [] },
      { g11: false, available: true, session: [] },
      { g12: false, available: true, session: [] },
      { g13: false, available: true, session: [] },
      { g14: false, available: true, session: [] },
      { g15: false, available: true, session: [] },
      { g16: false, available: true, session: [] },
    ],
    [
      { h6: false, available: true, session: [] },
      { h7: false, available: true, session: [] },
      { h8: false, available: true, session: [] },
      { h9: false, available: true, session: [] },
      { h10: false, available: true, session: [] },
      { h11: false, available: true, session: [] },
      { h12: false, available: true, session: [] },
      { h13: false, available: true, session: [] },
      { h14: false, available: true, session: [] },
      { h15: false, available: true, session: [] },
      { h16: false, available: true, session: [] },
    ],
    [
      { i1: false, available: true, session: [] },
      { i2: false, available: true, session: [] },
      { i3: false, available: true, session: [] },
      { i4: false, available: true, session: [] },
      { i5: false, available: true, session: [] },
    ],
    [
      { j1: false, available: true, session: [] },
      { j2: false, available: true, session: [] },
      { j3: false, available: true, session: [] },
      { j4: false, available: true, session: [] },
      { j5: false, available: true, session: [] },
    ],
    [
      { i6: false, available: true, session: [] },
      { i7: false, available: true, session: [] },
      { i8: false, available: true, session: [] },
      { i9: false, available: true, session: [] },
      { i10: false, available: true, session: [] },
      { i11: false, available: true, session: [] },
      { i12: false, available: true, session: [] },
      { i13: false, available: true, session: [] },
      { i14: false, available: true, session: [] },
      { i15: false, available: true, session: [] },
      { i16: false, available: true, session: [] },
    ],
    [
      { j6: false, available: true, session: [] },
      { j7: false, available: true, session: [] },
      { j8: false, available: true, session: [] },
      { j9: false, available: true, session: [] },
      { j10: false, available: true, session: [] },
      { j11: false, available: true, session: [] },
      { j12: false, available: true, session: [] },
      { j13: false, available: true, session: [] },
      { j14: false, available: true, session: [] },
      { j15: false, available: true, session: [] },
      { j16: false, available: true, session: [] },
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
      if (data["session"].length > 0) {
        const user = data["session"][0]
        if (user?.email !== profile?.email) {
          toast.info("You've been removed from the queue for the seat " + seat)
        }
      }
      const filteredVals = selectedSeats.filter((s) => s !== seat)
      setSelectedSeats(filteredVals)
      setPrice((prev) => prev - price)
    } else {
      if (data["session"].length > 0) {
        const user = data["session"][0]
        if (user?.email !== profile?.email) {
          toast.info("You've been added to the queue for the seat " + seat)
        } else {
          toast.info(
            "Looks like you are the first one in the queue for this seat"
          )
        }
      }
      setSelectedSeats((prev) => [...prev, seat])
      setPrice((prev) => prev + price)
    }
  }

  // function to convert single object to array
  const objectToArray = (obj) => {
    const result = []
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push(key, obj[key])
      }
    }
    return result
  }

  // useEffect to mark already booked seats
  useEffect(() => {
    const markBooked = () => {
      if (!tickets) return
      const foundMovie = tickets?.filter((t) => t?.title === title)
      const bookedTickets = foundMovie[0]?.confirmed
      const mainArray = Array.from(seatArrangement)
      for (let i = 0; i < mainArray.length; i++) {
        const subObjects = mainArray[i]
        for (let j = 0; j < subObjects?.length; j++) {
          const subObject = subObjects[j]
          const convertedSubObject = objectToArray(subObject)
          if (bookedTickets?.includes(convertedSubObject[0])) {
            subObject["available"] = false
          }
        }
      }
      setSeatArrangement(mainArray)
    }
    markBooked()
  }, [tickets, title])

  // useEffect to mark sessions
  useEffect(() => {
    const markSession = () => {
      if (!tickets) return
      const foundMovie = tickets?.filter((t) => t?.title === title)
      const sessionTickets = foundMovie[0]?.session
      const mainArray = Array.from(seatArrangement)
      const subMap = new Map(
        sessionTickets?.map((obj) => [obj.seat, obj.session])
      )
      for (const innerArray of mainArray) {
        for (const obj of innerArray) {
          const seat = Object.keys(obj)[0]
          if (subMap.has(seat)) {
            obj.session = subMap?.get(seat)
          }
        }
      }
      setSeatArrangement(mainArray)
    }
    markSession()
  }, [tickets, title])

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
      let trueCount = 0
      seatArrangement?.forEach((subArray) => {
        subArray?.forEach((obj) => {
          for (const key in obj) {
            if (
              obj?.hasOwnProperty(key) &&
              key !== "available" &&
              key !== "session"
            ) {
              if (obj[key] === true) {
                trueCount++
              }
            }
          }
        })
      })
      setCount(trueCount)
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

    const mainArr = Array.from(seatArrangement)
    const filteredSeats = []
    mainArr.forEach((subArray) => {
      subArray.forEach((obj) => {
        const firstKey = Object.keys(obj)[0]
        if (selectedSeats.includes(firstKey)) {
          filteredSeats.push(obj)
        }
      })
    })

    navigate("/payment", {
      state: { filteredSeats },
    })
  }

  return (
    <div>
      <div>
        <TheatreInfo image={image} cast={cast} title={title} count={count} />
        <div className="flex mt-2 items-center justify-center gap-10">
          <div className="flex items-center justify-center gap-3">
            <p>Available</p>
            <div className="grid-item w-5 h-5"></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p>Booked</p>
            <div className="grid-item w-5 h-5 bg-gray-400 text-white"></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p>In Session (1p)</p>
            <div className="grid-item w-5 h-5 bg-amber-200 text-white"></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p>In Session (2p)</p>
            <div className="grid-item w-5 h-5 bg-amber-500 text-white"></div>
          </div>
        </div>
        <div className="theatre_seating grid justify-center">
          <div className="recliner">
            <div className="sear_area_name">RC - Rs. 200</div>
            <hr />
            <div className=" flex justify-center mt-2">
              <div className="flex justify-center gap-5">
                {convertToArr(seatArrangement[0]).map((item, index) => (
                  <div
                    className={`grid-item ${
                      item[5].length === 1 && "bg-amber-200"
                    } ${item[5].length === 2 && "bg-amber-500"} ${
                      item[1] && "selectedSeat"
                    } ${!item[3] && "bg-gray-400 text-white"} ${
                      item[3] && "text-[#50ac82]"
                    }`}
                    title={
                      !item[3]
                        ? "booked"
                        : item[5].length === 1
                        ? "Queue 1 person long"
                        : item[5].length === 2
                        ? "Queue 2 people long"
                        : undefined
                    }
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
                        className={`grid-item ${
                          it[5].length === 1 && "bg-amber-200"
                        } ${it[5].length === 2 && "bg-amber-500 text-white"} ${
                          it[1] && "selectedSeat"
                        } ${!it[3] && "bg-gray-400 text-white"} ${
                          it[3] && "text-[#50ac82]"
                        }`}
                        title={
                          !it[3]
                            ? "booked"
                            : it[5].length === 1
                            ? "Queue 1 person long"
                            : it[5].length === 2
                            ? "Queue 2 people long"
                            : undefined
                        }
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
                        className={`grid-item ${
                          it[5].length === 1 && "bg-amber-200"
                        } ${it[5].length === 2 && "bg-amber-500 text-white"} ${
                          it[1] && "selectedSeat"
                        } ${!it[3] && "bg-gray-400 text-white"} ${
                          it[3] && "text-[#50ac82]"
                        }`}
                        title={
                          !it[3]
                            ? "booked"
                            : it[5].length === 1
                            ? "Queue 1 person long"
                            : it[5].length === 2
                            ? "Queue 2 people long"
                            : undefined
                        }
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
                        className={`grid-item ${
                          it[5].length === 1 && "bg-amber-200"
                        } ${it[5].length === 2 && "bg-amber-500 text-white"} ${
                          it[1] && "selectedSeat"
                        } ${!it[3] && "bg-gray-400 text-white"} ${
                          it[3] && "text-[#50ac82]"
                        }`}
                        title={
                          !it[3]
                            ? "booked"
                            : it[5].length === 1
                            ? "Queue 1 person long"
                            : it[5].length === 2
                            ? "Queue 2 people long"
                            : undefined
                        }
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
                        className={`grid-item ${
                          it[5].length === 1 && "bg-amber-200"
                        } ${it[5].length === 2 && "bg-amber-500 text-white"} ${
                          it[1] && "selectedSeat"
                        } ${!it[3] && "bg-gray-400 text-white"} ${
                          it[3] && "text-[#50ac82]"
                        }`}
                        title={
                          !it[3]
                            ? "booked"
                            : it[5].length === 1
                            ? "Queue 1 person long"
                            : it[5].length === 2
                            ? "Queue 2 people long"
                            : undefined
                        }
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
                        className={`grid-item ${
                          it[5].length === 1 && "bg-amber-200"
                        } ${it[5].length === 2 && "bg-amber-500 text-white"} ${
                          it[1] && "selectedSeat"
                        } ${!it[3] && "bg-gray-400 text-white"} ${
                          it[3] && "text-[#50ac82]"
                        }`}
                        title={
                          !it[3]
                            ? "booked"
                            : it[5].length === 1
                            ? "Queue 1 person long"
                            : it[5].length === 2
                            ? "Queue 2 people long"
                            : undefined
                        }
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
                        className={`grid-item ${
                          it[5].length === 1 && "bg-amber-200"
                        } ${it[5].length === 2 && "bg-amber-500 text-white"} ${
                          it[1] && "selectedSeat"
                        } ${!it[3] && "bg-gray-400 text-white"} ${
                          it[3] && "text-[#50ac82]"
                        }`}
                        title={
                          !it[3]
                            ? "booked"
                            : it[5].length === 1
                            ? "Queue 1 person long"
                            : it[5].length === 2
                            ? "Queue 2 people long"
                            : undefined
                        }
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
