import React, {useState} from "react";
import TicketImg from '../assets/ticket.png'
import './ticket.css'
import MovieImg from '../assets/poster/posterrr1 (1) (1).jpg';
import GADAR from "../assets/poster/posterr2.jpg"
import OMG from "../assets/poster/posterr4.jpg"
import html2pdf from "html2pdf.js";

const Ticket = ({movie_name, movie_seats, movie_price}) => {
    const element = document.getElementsByClassName('ticket_img_div')[0];
    const options = {
        filename: 'my-document.pdf',
        margin: 0.1,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
    };
    const [chal, setChal] = useState(true);

    if(chal){
        html2pdf().set(options).from(element).save();
        setChal(false);
    }

    return(
        <div className="ticket scale-50 flex flex-col items-center">
            <div className="payment_success">
                Payment Successfull !!!
            </div>
            <div className="ticket_div">
                <div className="ticket_img_div">
                    <img src= {TicketImg} alt="" />
                    <div className="booked_movie_img on_ticket">
                        <img src={(movie_name == "Gadar 2")? GADAR: MovieImg} alt="" />
                    </div>
                    <div className="booked_show_time on_ticket">
                        <div className="screen_title humpty">SAT 16, SEPT</div>
                        <div className="screen_name dumpty">06: 45 PM</div>
                    </div>
                    <div className="booked_screen on_ticket">
                        <div className="screen_title humpty">SCREEN</div>
                        <div className="screen_name dumpty">AUDI 2</div>
                    </div>
                    <div className="booked_theatre on_ticket">
                        <i class="fa-solid fa-location-dot"></i> S-Square Mall, Subhanpura, Vadodara
                    </div>
                    <div className="booked_movie_name on_ticket">
                        {movie_name}
                    </div>
                    <div className="booked_seats on_ticket">
                        <div className="seat_title humpty">SEATS</div>
                        <div className="seat_names dumpty">{movie_seats}</div>
                    </div>
                    <div className="booked_amt on_ticket">
                        <div className="seat_title humpty">PRICE</div>
                        <div className="seat_names dumpty">₹ {movie_price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket;