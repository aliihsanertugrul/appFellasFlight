import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FlightContext = createContext(null);

// const FlightProvider = ({ children }) => {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchFlights = (queryParams) => {
//     console.log("queryParams", queryParams);
//     const flightDirection = queryParams?.flightDirection || '';
//     const scheduleDate = queryParams?.scheduleDate || '';
//     const page = queryParams?.page;
//     const route = queryParams?.route;

//     const queryString = [
//       flightDirection && `flightDirection=${flightDirection}`,
//       scheduleDate && `scheduleDate=${scheduleDate}`,
//       page && `page=${page}`,
//       route && `route=${route}`,
//     ].filter(Boolean).join('&');

//     axios
//       .get(`https://api.schiphol.nl/public-flights/flights`,{
//         headers:{
//           Accept: "application/json",
//           app_id: "9b1626cf",
//           app_key: "24947149ec3b2cc1fbe13a4efeab9ebc",
//           ResourceVersion: "v4",
//         }
//       })
//       .then((response) => {
//         console.log("Uçuş verileri", response.data);
//         setFlights(response.data.flights);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Hata:", error);
//         setError(error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchFlights({});
//   }, []);

//   return (
//     <FlightContext.Provider value={{ flights, loading, error, fetchFlights }}>
//       {children}
//     </FlightContext.Provider>
//   );
// };

// export default FlightProvider;

const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = (queryParams) => {
    console.log("queryParams", queryParams);
    const flightDirection = queryParams?.flightDirection || '';
    const scheduleDate = queryParams?.scheduleDate || '';
    const page = queryParams?.page;
    const route = queryParams?.route;

    const queryString = [
      flightDirection && `flightDirection=${flightDirection}`,
      scheduleDate && `scheduleDate=${scheduleDate}`,
      page && `page=${page}`,
      route && `route=${route}`,
    ].filter(Boolean).join('&');

    axios
      .get(`http://localhost:3001/api/public-flights/flights?${queryString}`)
      .then((response) => {
        console.log("Uçuş verileri", response.data);
        setFlights(response.data.flights);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hata:", error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFlights({});
  }, []);

  return (
    <FlightContext.Provider value={{ flights, loading, error, fetchFlights }}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightProvider;
