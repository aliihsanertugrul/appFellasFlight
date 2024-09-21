const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const cors = require('cors'); // Add the cors middleware
const flightReservations = require('./routes/flightReservations');

const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/flightDB")
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch((error) => console.error("MongoDB bağlantı hatası:", error));

// Enable CORS for your front-end app at localhost:3000
app.use(cors({
  origin: 'http://localhost:3000' // Allow only requests from localhost:3000
}));

// Middleware
app.use(express.json()); // To parse JSON bodies

// Proxy API
app.use('/api', (req, res) => {
  console.log(req.url);
  const url = `https://api.schiphol.nl${req.url}`;

  // Extract query parameters
  const { flightDirection, scheduleDate, page, iata, airline } = req.query;

  // Proxy request headers
  const headers = {
    'ResourceVersion': 'v4',
    'app_id': '9b1626cf',  // Replace with your actual app_id
    'app_key': '24947149ec3b2cc1fbe13a4efeab9ebc', // Replace with your actual app_key
  };

  if (flightDirection) headers.flightDirection = flightDirection;
  if (scheduleDate) headers.scheduleDate = scheduleDate;
  if (page) headers.page = page;
  if (iata) headers.iata = iata;
  if (airline) headers.airline = airline;

  req.pipe(request({ url, headers })).pipe(res);
});

// Flight reservations route
app.use("/api/flight-reservations", flightReservations);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
