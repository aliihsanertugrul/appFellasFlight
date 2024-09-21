// models/FlightReservation.js
const mongoose = require('mongoose');

const flightReservationSchema = new mongoose.Schema({
    userId: String,
    flightNumber: String,
    departureTime: Date,
    arrivalTime: Date,
    departureAirport: String,
    arrivalAirport: String,
    price: Number,
  });

const FlightReservation = mongoose.model('FlightReservation', flightReservationSchema);
module.exports = FlightReservation;
