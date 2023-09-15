import React, { useState } from "react"
import Logo from "../assets/logo.png"
import LoginSignup from "./LoginSignup"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar = () => {
  const navigate = useNavigate()
  const [showOverlay, setShowOverlay] = useState(false)
  const { profile } = useSelector((state) => state?.userData)

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  return (
    <>
      <div className="navbar">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          className="brand-logo cursor-pointer"
          alt="logo"
        />

        <div className="input">
          <ion-icon name="search"></ion-icon>
          <input
            className="search"
            placeholder="Search for Movies, Events, Plays, Sports, and Activities"
          ></input>
        </div>

        <div className="right-container">
          <p className="location">
            Vadodara<ion-icon name="caret-down-sharp"></ion-icon>
          </p>
          <button className="Sign-in capitalize" onClick={toggleOverlay}>
            {profile && profile?.name ? profile?.name : "Sign-in"}
          </button>

          <a href="/" className="btn-customized open-menu">
            <ion-icon name="menu-outline"></ion-icon>
          </a>
        </div>
      </div>

      <div className="subnavbar">
        <ul className="navitem flex text-white gap-3 text-sm">
          <li>
            <p
              onClick={() => navigate("/problem-statement")}
              className="cursor-pointer"
            >
              {"The Problem Faced"}
            </p>
          </li>
        </ul>

        <ul className="navitem1 flex text-white gap-3 text-sm">
          <li>
            <p onClick={() => navigate("/solution")} className="cursor-pointer">
              {"The Solution We Prepared"}
            </p>
          </li>
        </ul>
      </div>

      <div className="relative">
        {showOverlay && <LoginSignup toggleOverlay={toggleOverlay} />}
      </div>
    </>
  )
}

export default Navbar
