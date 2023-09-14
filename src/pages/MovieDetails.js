import React from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const MovieDetails = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const { profile, seatData } = useSelector((state) => state?.userData)

  // const { image, title, cast } = state

  const bookTickets = () => {
    if (!profile) return toast.warn("Sing In before booking the tickets")

    if (seatData && seatData?.movie && state?.title !== seatData?.movie) {
      toast.info(
        "Please cancel it, or refresh the page to automatically cancel"
      )
      toast.info("You have a previous session pending in a different movie")
      return
    }
    navigate("/theatre", {
      state: {
        title: state?.title,
        image: state?.image,
        cast: state?.cast,
      },
    })
  }

  return (
    <div>
      <div className="jawaaan">
        <div className="firstdiv">
          <div className="frame">
            <section className="frame2">
              <div type="vertical" className="frame3">
                <div
                  className="frame4"
                  style={{
                    borderRadius: "16px 16px 0px 0px",
                    objectFit: "cover",
                  }}
                >
                  <img
                    src={state?.image}
                    alt="nothing"
                    className="imgclass"
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "16px 16px 0px 0px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="headname">
            <h1 className="headname2">{state?.title}</h1>
            <div className="buttoncontainer">
              <button className="date">Releasing on 7 Sep,2023</button>
              <button onClick={bookTickets} className="clickon">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cast">
        <img src={state?.cast} alt="nothing" className="castset" />
      </div>
    </div>
  )
}

export default MovieDetails
