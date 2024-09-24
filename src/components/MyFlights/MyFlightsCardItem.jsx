import React from "react";

import "./MyFlightsCardItem.css";
import PriceCards from "./PriceCards";

const MyFlightsCardItem = ({ reservation }) => {
  console.log(reservation);
  const {arrivalAirport,arrivalTime,departureAirport,departureTime,flightNumber,price,flightDuration,airline} = reservation
  const formattedDepartureTime = new Date(departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedArrivalTime = new Date(arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="my-flights-card-item">
      <div className="row">
        <div className="col-2">
          <img src="/images/alitalia.png" width={50} alt="" />
        </div>
        <div className="col-5 flight-info">
          <div className="flight-time">{formattedDepartureTime} - {formattedArrivalTime}</div>
          <div className="flight-details-container">
            <div className="flight-details">
              <p>{airline}</p>
              <div class="dropdown">
                <button
                  class="dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{color:"#47a4cc",padding:"0"}}
                >
                  Flight Details
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flight-details">
              <p>Nonstop</p>
              <p>{flightDuration}</p>
            </div>
            <div className="flight-details">
              <p>{departureAirport} to {arrivalAirport}</p>
              <p>{flightNumber}</p>
            </div>
          </div>
        </div>
        <div className="col-5">
          <PriceCards />
        </div>
      </div>
    </div>
  );
};

export default MyFlightsCardItem;
