import React from 'react'

import './CardRentals.css'
import CardRentalItem from './CardRentalItem.jsx'
import cardRentalData from "./cardRental.json"
import "./CardRentals.css"

const CardRentals = () => {
  return (
    <ul className='card-rentals-container'>
      {cardRentalData.map((rental) => (
        <CardRentalItem key={rental.id} rentalData={rental} />
      ))}
    </ul>
  )
}

export default CardRentals