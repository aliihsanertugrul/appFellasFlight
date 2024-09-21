import React, { useEffect, useState } from "react";

import MyFlightsCardItem from "./MyFlightsCardItem";
import TopHeader from "./TopHeader";
import axios from "axios";

const MyFlightsCard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/flight-reservations');
        console.log("object,", response.data);
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
     <TopHeader/>
      <MyFlightsCardItem />
    </div>
  );
};

export default MyFlightsCard;
