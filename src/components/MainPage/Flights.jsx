import React, { useContext } from 'react'
import FlightItem from './FlightItem'
import { FlightContext } from '../../context/flightsContext'

const Flights = () => {
  const {flights} = useContext(FlightContext)
  return (
    <div>
      {flights.map((flight) => (
        <FlightItem key={flight.id} flight={flight}/>
      ))}
      
    </div>
  )
}

export default Flights