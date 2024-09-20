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
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [departureOptions, setDepartureOptions] = useState([]);
  const [arrivalOptions, setArrivalOptions] = useState([]);
  const [flightDirection, setFlightDirection] = useState("")
  
  const schipholCode = "AMS";
  const route = departure == schipholCode ? arrival : departure;

  // useEffect(() => {
  //   if (departure) {
  //     const flightDirection = departure === schipholCode ? "D" : "A";
  //     fetchFlights({ flightDirection, scheduleDate: departureDate});
  //   }
  // }, [departure, departureDate]);
  

  // Uçuşları filtreleme
  const filterFlights = () => {
     
    // const filtered = flights.filter((flight) => {
    //   const flightDeparture = flight.route.destinations[0];
    //   const flightArrival = flight.route.destinations[flight.route.destinations.length - 1];
    //   const flightDate = flight.scheduleDate;

    //   const isDepartureMatch = !departure || flightDeparture === departure;
    //   const isArrivalMatch = !arrival || flightArrival === arrival;
    //   const isDateMatch = (!departureDate || flightDate >= departureDate) &&
    //                       (!returnDate || flightDate <= returnDate);

    //   return isDepartureMatch && isArrivalMatch && isDateMatch;
    // });
    // setFilteredFlights(filtered);
  };
  console.log(flightDirection,departureDate);
  useEffect(() => {
    if (flights.length > 0) {
      const uniqueAirports = [...new Set(flights.map(flight => flight.route.destinations[flight.route.destinations.length - 1]))];
      setDepartureOptions([schipholCode, ...uniqueAirports]);
      
      // Kalkış noktasına göre varış seçeneklerini güncelleme
      setArrivalOptions(departure === schipholCode ? uniqueAirports : [schipholCode]);
    }
  }, [flights, departure]);

  const handleSearch = async(e) => {
    e.preventDefault();
    try {
      
      await fetchFlights({ flightDirection, scheduleDate: departureDate,route});
      
    } catch (error) {
      console.log(error);
    }
    
  };

  if (loading) return <p>Loading flights...</p>;
  if (error) return <p>Error loading flights: {error.message}</p>;

  const handleDepartureChange = (e) => {
    const value=e.target.value
    setDeparture(value);
    if (value === schipholCode) {
      setFlightDirection("D");
    } else {
      setFlightDirection("A");
    }
  }
  console.log("flights", flights);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <FaPlane /> BOOK YOUR FLIGHT
        </h5>
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
                  <option key={index} value={dep}>{dep}</option>
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
                  <option key={index} value={arr}>{arr}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-group-container">
            <div className="input-group mb-3 calendar-left">
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
          </div>
          <button type="submit" className="btn btn-primary" >Show flights</button>
        </form>
                
        
      </div>
    </div>
  );
};

export default BookYourFlightCard;
