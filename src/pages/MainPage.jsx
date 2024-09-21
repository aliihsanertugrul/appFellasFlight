import React from "react";
import CardRentals from "../components/MainPage/CardRentals";

import BookYourFlightCard from "../components/MainPage/BookYourFlightCard";
import Flights from "../components/MainPage/Flights";
import SortSection from "../components/MainPage/SortSection";

const MainPage = () => {
  return (
    <div className="main-page-container">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-12">
              <BookYourFlightCard  />
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <Flights/>
              
            </div>
            <div className="col-4">
              <SortSection />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardRentals />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
