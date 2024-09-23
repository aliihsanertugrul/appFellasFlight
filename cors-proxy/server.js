const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS middleware
const flightReservations = require('./routes/flightReservations');

const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/flightDB")
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch((error) => console.error("MongoDB bağlantı hatası:", error));

// Enable CORS for your front-end app at localhost:3000
app.use(cors());

// Middleware
app.use(express.json()); // To parse JSON bodies

// Flight reservations route
app.use("/api/flight-reservations", flightReservations);

// Proxy API
app.use('/api', (req, res) => {
  const url = `https://api.schiphol.nl${req.url}`;
  console.log("url", url);
console.log("reqqq", req.url);
  // Proxy request headers
  const headers = {
    'ResourceVersion': 'v4',
    'app_id': '9b1626cf',  // Replace with your actual app_id
    'app_key': '24947149ec3b2cc1fbe13a4efeab9ebc', // Replace with your actual app_key
  };

  request({ url, headers }, (error, response, body) => {
    if (error) {
      console.error('Proxy error:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
    res.status(response.statusCode).send(body);
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
