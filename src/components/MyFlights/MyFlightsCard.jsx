import React, { useContext, useEffect, useState } from "react";
import MyFlightsCardItem from "./MyFlightsCardItem";
import TopHeader from "./TopHeader";
import axios from "axios";
import { FlightContext } from "../../context/flightsContext";

const MyFlightsCard = () => {
  const { reservations, setReservations } = useContext(FlightContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/flight-reservations');
        console.log("reservations", response.data);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TopHeader />
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <MyFlightsCardItem key={reservation._id} reservation={reservation} />
        ))
      ) : (
        <div>No reservations available.</div>
      )}
    </div>
  );
};

export default MyFlightsCard;
