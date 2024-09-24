import React, { useContext, useState, useEffect } from "react";
import { FaPlane, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { BiSolidCalendarEvent } from "react-icons/bi";

import "./BookYourFlightCard.css";
import { FlightContext } from "../../context/flightsContext";

const BookYourFlightCard = () => {
  const { flights, loading, error, fetchFlights } = useContext(FlightContext);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [departureOptions, setDepartureOptions] = useState([]);
  const [arrivalOptions, setArrivalOptions] = useState([]);
  const [flightDirection, setFlightDirection] = useState("");
  const [tripType, setTripType] = useState("round-trip"); // Round trip is active initially

  const schipholCode = "AMS";
  const route = departure == schipholCode ? arrival : departure;

  useEffect(() => {
    if (flights.length > 0) {
      const uniqueAirports = [
        ...new Set(
          flights.map(
            (flight) =>
              flight.route.destinations[flight.route.destinations.length - 1]
          )
        ),
      ];
      setDepartureOptions([schipholCode, ...uniqueAirports]);

      // Update the options based on the departure point
      setArrivalOptions(
        departure === schipholCode ? uniqueAirports : [schipholCode]
      );
    }
  }, [flights, departure]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (tripType === "one-way") {
        await fetchFlights({
          flightDirection: flightDirection,
          scheduleDate: departureDate,
          route: route,
        });
      } else {
        await fetchFlights({
          flightDirection: flightDirection,
          fromScheduleDate: departureDate,
          toScheduleDate: returnDate,
          route: route,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (error) return <p>Error loading flights: {error.message}</p>;

  const handleDepartureChange = (e) => {
    const value = e.target.value;
    setDeparture(value);
    if (value === schipholCode) {
      setFlightDirection("D");
    } else {
      setFlightDirection("A");
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="card-title">
            <FaPlane /> BOOK YOUR FLIGHT
          </h5>
          <div className="book-your-flight-buttons">
            <button
              className={`round-trip ${
                tripType === "round-trip" ? "active" : ""
              }`}
              onClick={() => handleTripTypeChange("round-trip")}
            >
              Round Trip
            </button>
            <button
              className={`one-way ${tripType === "one-way" ? "active" : ""}`}
              onClick={() => handleTripTypeChange("one-way")}
            >
              One Way
            </button>
          </div>
        </div>
        <form onSubmit={handleSearch}>
          <div className="input-group-container">
            <div className="input-group mb-3 departure">
              <span className="input-group-text">
                <FaPlaneDeparture />
              </span>
              <select
                className="form-control"
                value={departure}
                onChange={(e) => handleDepartureChange(e)}
              >
                <option value="">Select Departure</option>
                {departureOptions.map((dep, index) => (
                  <option key={index} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3 arrival">
              <span className="input-group-text">
                <FaPlaneArrival />
              </span>
              <select
                className="form-control"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                disabled={!departure}
              >
                <option value="">Select Arrival</option>
                {arrivalOptions.map((arr, index) => (
                  <option key={index} value={arr}>
                    {arr}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-group-container">
            <div
              className={`input-group mb-3 ${
                tripType === "one-way"
                  ? "one-way-calendar-left"
                  : "calendar-left"
              }`}
            >
              <span className="input-group-text">
                <BiSolidCalendarEvent />
              </span>
              <input
                type="date"
                className="form-control"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            {tripType === "round-trip" && (
              <div className="input-group mb-3 calendar-right">
                <span className="input-group-text">
                  <BiSolidCalendarEvent />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            )}
          </div>
          <button type="submit" className="custom-btn-primary">
            Show flights
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookYourFlightCard;
