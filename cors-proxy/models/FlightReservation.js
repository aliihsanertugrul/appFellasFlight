const mongoose = require('mongoose');

const flightReservationSchema = new mongoose.Schema({
    userId: String,
    flightNumber: Number,
    departureTime: Date,
    arrivalTime: Date,
    departureAirport: String,
    arrivalAirport: String,
    price: Number,
    flightDuration: String,
});

const FlightReservation = mongoose.model('FlightReservation', flightReservationSchema);
module.exports = FlightReservation;
