import React from "react"
import P1 from '../assets/P1.jpg'
import P2 from '../assets/P2.jpg'
import P3 from '../assets/P3.jpg'
import P4 from '../assets/P4.jpg'

const ProblemStatement = () => {
  return (
    <div className="problem_statement">
      <div className="hai_yaa_nhi">
        IS CURRENT BOOKING SYSTEM EFFICIENT ?  I DON'T KNOW BRO...
      </div>
      <div className="problems">
        PROBLEMS
        <div className="problems_div flex-wrap">
          <div className="pdiv">
            <img src={P1} alt="" />
            <div>LOSS OF REVENUE</div>
          </div>
          <div className="pdiv">
            <img src={P2} alt="" />
            <div>INCREASED SCAMS</div>
          </div>
          <div className="pdiv">
            <img src={P3} alt="" />
            <div>NO INNOVATION</div>
          </div>
          <div className="pdiv">
            <img src={P4} alt="" />
            <div>ONLY MAINTENENCE</div>
          </div>
        </div>
      </div>
      <div className="hai_yaa_nhi">
        IS CURRENT BOOKING SYSTEM EFFICIENT ?  NO, IT CAN BE IMPROVED... &#128161;
      </div>
    </div>
  )
}

export default ProblemStatement
