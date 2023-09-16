import React from "react"
import Logo from '../assets/bms.png'

const Solution = () => {
  return (
    <div className="solution_page">
      <div className="changing">
        CHANGING 
        <img src={Logo} alt="" />
        FOREVER ...
      </div>
      <div className="about_solution">
        ABOUT OUR SOLUTION
        <div className="solution_detail">
          Seeing the current movie ticket booking un-identified problems, we built a solution to make the system better. Unlike the previous booking systme, our system will have 5 seat status representing each new phrase. This is done for making the booking more transparent and more reliable. We take care that the scammers don't keep the seats in session to avoid to fake bookings by stopping them every possible way. All this is done without disturbing its current abilities and strenghts. But also ensuring that this will lead to a better and economical Indian Cinema, Sports, Shows and together a BETTER and ECONOMICAL NATION. 
        </div>
      </div>
      <div className="advantages">
        <div className="adv">convenience &#9989;</div>
        <div className="adv">decreased scams &#9989;</div>
        <div className="adv">no loss of revenue &#9989;</div>
        <div className="adv">efficient system &#9989;</div>
        <div className="adv">100% working solution &#9989;</div>
      </div>
    </div>
  )
}

export default Solution
