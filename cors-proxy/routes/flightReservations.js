const express = require('express');
const router = express.Router();
const Reservation = require("../models/FlightReservation");

// POST /api/flight-reservations/reserve
router.post('/reserve', async (req, res) => {
 
  try {
    const { userId, flightNumber, departureTime, arrivalTime, departureAirport, arrivalAirport, price, flightDuration,airline } = req.body;

    // Yeni rezervasyonu oluştur
    const newReservation = new Reservation({
      userId,
      flightNumber,
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport,
      price, 
      flightDuration,
      airline
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

// Route for public flights
router.get('/public-flights/flights', (req, res) => {
  const url = 'https://api.schiphol.nl/public-flights/flights'; // The direct API URL

  // Proxy request headers
  const headers = {
      'ResourceVersion': 'v4',
      'app_id': '9b1626cf',  // Replace with your actual app_id
      'app_key': '24947149ec3b2cc1fbe13a4efeab9ebc', // Replace with your actual app_key
  };

  request({ url, headers }, (error, response, body) => {
      if (error) {
          console.error('Error retrieving public flights:', error);
          return res.status(500).json({ message: 'Error retrieving flights', error });
      }
      res.status(response.statusCode).send(body);
  });
});



module.exports = router;
