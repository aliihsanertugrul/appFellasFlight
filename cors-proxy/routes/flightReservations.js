const express = require('express');
const router = express.Router();
const Reservation = require("../models/FlightReservation");

// POST /api/flight-reservations/reserve
router.post('/reserve', async (req, res) => {
  try {
    const { userId, flightNumber, departureTime, arrivalTime, departureAirport, arrivalAirport, price, flightDuration } = req.body;

    // Yeni rezervasyonu oluştur
    const newReservation = new Reservation({
      userId,
      flightNumber,
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport,
      price, 
      flightDuration
    });

    // Veritabanına kaydet
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Rezervasyon hatası:", error);
    res.status(500).json({ message: "İçsel Sunucu Hatası" });
  }
});

// GET /api/flight-reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Rezervasyonları alma hatası:", error);
    res.status(500).json({ message: "İçsel Sunucu Hatası" });
  }
});



module.exports = router;
