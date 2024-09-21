import React from "react";

import "./MyFlightsCardItem.css";
import PriceCards from "./PriceCards";

const MyFlightsCardItem = () => {
  return (
    <div className="my-flights-card-item">
      <div className="row">
        <div className="col-2">
          <img src="/images/alitalia.png" width={50} alt="" />
        </div>
        <div className="col-5 flight-info">
          <div className="flight-time">7:40 AM - 9:30 AM</div>
          <div className="flight-details-container">
            <div className="flight-details">
              <p>Delta Airlines</p>
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
              <p>1h 32m</p>
            </div>
            <div className="flight-details">
              <p>SFO to LAX</p>
              <p>DL 1443</p>
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
