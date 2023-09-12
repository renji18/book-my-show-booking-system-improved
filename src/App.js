import React from "react"
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

const App = () => {
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
