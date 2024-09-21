import React, { useEffect, useState } from "react";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";
import { IoAirplane } from "react-icons/io5";
import "./FlightItem.css";
import axios from "axios";

const FlightItem = ({ flight }) => {
  const {
    estimatedLandingTime,
    scheduleDateTime,
    route,
    prefixICAO,
    flightDirection,
    id,
    flightNumber,
  } = flight;
  const [flightDuration, setFlightDuration] = useState("");
  const [destinationData, setDestinationData] = useState("");
  const [airlineData, setAirlineData] = useState("");
  const [loading, setLoading] = useState(true); // Yüklenme durumu için state
  const destination = route.destinations[route.destinations.length - 1];

  useEffect(() => {
    // Uçuş bilgileriyle ilgili API'ye istek yap
    const fetchDestinationData = async () => {
      try {
        const responseDestination = await axios.get(
          `http://localhost:3001/api/public-flights/destinations/${prefixICAO}`
        );
        const responseAirline = await axios.get(
          `http://localhost:3001/api/public-flights/airlines/${prefixICAO}`
        );
        setDestinationData(responseDestination?.data?.publicName?.english);
        setAirlineData(responseAirline?.data?.publicName);
        setLoading(false); // Veriler alındığında yüklenme durumu kapatılır
      } catch (error) {
        console.error("Hata:", error);
        setLoading(false); // Hata durumunda da yüklenme durumu kapatılır
      }
    };

    fetchDestinationData();
  }, [prefixICAO]); // `prefixICAO` değiştiğinde yeniden isteği yap

  useEffect(() => {
    if (scheduleDateTime && estimatedLandingTime) {
      const calculateFlightDuration = (
        scheduleDateTime,
        estimatedLandingTime
      ) => {
        const departureTime = new Date(scheduleDateTime);
        const landingTime = new Date(estimatedLandingTime);
        const durationInMilliseconds = landingTime - departureTime;
        const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor(
          (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );

        if (hours === 0) {
          return `${minutes} dakika`;
        }
        return `${hours} saat ${minutes} dakika`;
      };

      const duration = calculateFlightDuration(
        scheduleDateTime,
        estimatedLandingTime
      );
      setFlightDuration(duration);
    }
  }, [scheduleDateTime, estimatedLandingTime]);

  const departureTime = new Date(scheduleDateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const arrivalTime = new Date(estimatedLandingTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const departureAirport = flightDirection === "D" ? "AMS" : destination;
  const arrivalAirport = flightDirection === "D" ? destination : "AMS";

  const flightRouteText =
    flightDirection === "D"
      ? `Amsterdam - ${destinationData}`
      : `${destinationData} - Amsterdam`;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleBookFlight = async () => {
    try {
      const reservationData = {
        userId: id,  // Gerçek kullanıcı ID'sini burada kullanın
        flightNumber: flightNumber,
        departureTime: scheduleDateTime,
        arrivalTime: estimatedLandingTime,
        departureAirport,
        arrivalAirport,
        price: 200,  // Statik fiyat örneği
        flightDuration: "2 saat",  // Bu örnek için statik, flightDuration değişkenine bağlayabilirsiniz
      };

      const response = await axios.post("http://localhost:3001/api/flight-reservations/reserve", reservationData);
      console.log("Rezervasyon başarılı:", response.data);
    } catch (error) {
      console.error("Rezervasyon hatası:", error);
    }
  };
  return (
    <div className="card flight-card">
      <div className="card-body">
        <h6 className="card-title">{flightRouteText}</h6>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div>
              <TbPlaneDeparture /> Departure
            </div>
            <div>{departureTime}</div>
            <div>Airport: {departureAirport}</div>
          </div>

          <hr />

          <div className="text-center">
            <div>{airlineData}</div>
            <div>
              <IoAirplane />
            </div>
            <div>{flightDuration}</div>
          </div>

          <hr />

          <div>
            <div>
              <TbPlaneArrival /> Arrival
            </div>
            <div>{arrivalTime}</div>
            <div>Airport: {arrivalAirport}</div>
          </div>
        </div>
      </div>
      <div className="footer d-flex align-items-center justify-content-between">
        <div className="price-container">
          <p>Price: $200</p>
          <p>Round Trip</p>
        </div>
        <button className="book-flight-btn" onClick={handleBookFlight}>Book Flight</button>
        <div className="check-details">
          <a href="#">Check the details</a>
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
