import React, { useEffect, useState } from "react";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";
import { IoAirplane } from "react-icons/io5";

import "./FlightItem.css";

const FlightItem = ({ flight }) => {
  const { estimatedLandingTime, scheduleDateTime, route, prefixIATA, flightName, flightDirection } = flight;
  const [flightDuration, setFlightDuration] = useState("");
  const destination = route.destinations[route.destinations.length - 1];
console.log(estimatedLandingTime);
  useEffect(() => {
    if (scheduleDateTime && estimatedLandingTime) {
      // Uçuş süresini hesaplama fonksiyonu
      const calculateFlightDuration = (scheduleDateTime, estimatedLandingTime) => {
        const departureTime = new Date(scheduleDateTime);
        const landingTime = new Date(estimatedLandingTime);

        // Zaman farkını milisaniye cinsinden hesapla
        const durationInMilliseconds = landingTime - departureTime;

        // Milisaniyeleri saat ve dakikaya çevir
        const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        // Saat kısmı sıfır ise yalnızca dakika yaz
        if (hours === 0) {
          return `${minutes} dakika`;
        }

        return `${hours} saat ${minutes} dakika`;
      };

      const duration = calculateFlightDuration(scheduleDateTime, estimatedLandingTime);
      setFlightDuration(duration);
    }
  }, [scheduleDateTime, estimatedLandingTime]);

  // Kalkış ve iniş saatlerini yerel saat formatına çevirme
  const departureTime = new Date(scheduleDateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const arrivalTime = new Date(estimatedLandingTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Uçuş yönüne göre havaalanlarını belirleme
  const departureAirport = flightDirection === "D" ? "AMS" : destination; // Kalkış havaalanı
  const arrivalAirport = flightDirection === "D" ? destination : "AMS"; // Varış havaalanı

  return (
    <div className="card flight-card">
      <div className="card-body">
        <h6 className="card-title">Flight: {flightName} ({prefixIATA})</h6>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div>
              <TbPlaneDeparture /> Departure
            </div>
            <div>{departureTime}</div> {/* Kalkış saati */}
            <div>Airport: {departureAirport}</div> {/* Kalkış havaalanı */}
          </div>

          <hr />

          <div className="text-center">
            <div>
              <img src="/images/airline-logo.png" alt="airlineLogo" width={50} />
            </div>
            <div>
              <IoAirplane />
            </div>
            <div>{flightDuration}</div> {/* Uçuş süresi */}
          </div>

          <hr />

          <div>
            <div>
              <TbPlaneArrival /> Arrival
            </div>
            <div>{arrivalTime}</div> {/* İniş saati */}
            <div>Airport: {arrivalAirport}</div> {/* Varış havaalanı */}
          </div>
        </div>
      </div>
      <div className="footer d-flex align-items-center justify-content-between">
        <div className="price-container">
          <p>Price: $200</p>
          <p>Round Trip</p>
        </div>
        <button className="book-flight-btn">Book Flight</button>
        <div className="check-details">
          <a href="#">Check the details</a>
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
