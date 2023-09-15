import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import "./utility.css"
import MovieDetails from "./pages/MovieDetails"
import Theatre from "./pages/Theatre"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Payment from "./pages/Payment"
import SuccessPage from "./components/SuccessPage"
import FailPage from "./components/FailPage"
import { useDispatch, useSelector } from "react-redux"
import { updateSessionTurnAction } from "./redux/actions"
import Solution from "./pages/Solution"
import ProblemStatement from "./pages/ProblemStatement"

const App = () => {
  const dispatch = useDispatch()

  const { tickets } = useSelector((state) => state?.userData)

  useEffect(() => {
    const runTicketsLog = () => {
      if (!tickets) return
      dispatch(updateSessionTurnAction(tickets))
    }
    const interval = 5 * 1000

    const intervalId = setInterval(runTicketsLog, interval)
    return () => clearInterval(intervalId)
  }, [tickets])

  return (
    <>
      <ToastContainer
        hideProgressBar
        theme="colored"
        newestOnTop
        draggable={false}
        toastStyle={{ color: "#333333" }}
      />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/theatre" element={<Theatre />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailPage />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/problem-statement" element={<ProblemStatement />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
