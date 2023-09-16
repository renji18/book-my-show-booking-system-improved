import React from "react";
import './show.css'
import { useLocation, useNavigate } from "react-router-dom"

const Show = () => {
    const state = useLocation()
    const navigate = useNavigate();
    console.log(state?.state.title);

    const bookTickets = () => {

        navigate("/theatre", {
          state: {
            title: state?.state.title,
            image: state?.state.image,
            cast: state?.state.cast,
          },
        })
      }
    return(
        <div className="shows_page">
            <div className="show_movie">
                <div className="show_movie_name">
                    {state?.state.title} - Hindi
                </div>
                <div className="show_movie_certi">
                    <div className="ua">UA</div>
                    <div className="action">Action</div>
                </div>
            </div>
            <div className="show_dates">
                <div className="show_today_date">
                    <div className="show_day">SAT</div>
                    <div className="show_number">16</div>
                    <div className="show_month">SEPT</div>
                </div>
            </div>
            <div className="show_theatre">
                <div className="all_theatres">
                    <div className="show_theatre_info">
                        <div className="show_theatre_name">
                            Movietime: S-Square Mall, Subhanpura, Vadodara
                        </div>
                        <div className="show_timings">
                            <div className="show_show" onClick={bookTickets}>
                                06: 45
                            </div>
                        </div>

                        <div className="show_theatre_name">
                            PVR: Deep, Vadodara
                        </div>
                        <div className="show_timings">
                            <div className="show_show">
                                03: 30
                            </div>
                            <div className="show_show">
                                06: 45
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show;