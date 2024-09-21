// routes/flightReservations.js
const express = require('express');
const FlightReservation = require('../models/FlightReservation');

const router = express.Router();

// Tüm rezervasyonları getir
router.get('/', async (req, res) => {
  try {
    const reservations = await FlightReservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni rezervasyon ekle
router.post('/', async (req, res) => {
  const reservation = new FlightReservation(req.body);
  try {
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
