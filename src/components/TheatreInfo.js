import React from "react"
import { useNavigate } from "react-router-dom"

const TheatreInfo = ({ count, title, image, cast }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(`/movie/${title}`, {
      state: {
        title,
        image,
        cast,
      },
    })
  }

  return (
    <div className="main_info_header items-center pt-3 justify-between px-5">
      <button
        onClick={goBack}
        className="-translate-y-[2px] text-white scale-150 font-extrabold"
      >
        {"<"}
      </button>
      <div className="theader_moviename">{title && title}</div>

      <div className="theader_showinfo">
        MovieTime: S-Square Mall, Subhanpura, Vadodara | 13 Sept, 1:30 P.M
      </div>
      <div className="ticket_count">{count} Tickets</div>
    </div>
  )
}

export default TheatreInfo
