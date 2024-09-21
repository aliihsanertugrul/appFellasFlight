const express = require('express');
const request = require('request');
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const flightReservations = require("./routes/flightReservations");

app.use('/api', (req, res) => {
  console.log(req.url);
  const url = `https://api.schiphol.nl${req.url}`;

  // flightDirection'ı isteğe göre belirleyin
  const flightDirection = req.query.flightDirection || ''; // İsteğe bağlı olarak al
  const scheduleDate = req.query.scheduleDate || ''; // İsteğe bağlı olarak al
  const page = req.query.page || ''; // İsteğe bağlı olarak al
  console.log(flightDirection);

  // Proxy the request with headers
  req.pipe(request({
    url,
    headers: {
      'ResourceVersion': 'v4',
      'app_id': '9b1626cf',  // Replace with your actual app_id
      'app_key': '24947149ec3b2cc1fbe13a4efeab9ebc', // Replace with your actual app_key
      'flightDirection': flightDirection, // flightDirection değerini ekle
      'scheduleDate': scheduleDate,
      'page': page,
    }
  })).pipe(res);
});

app.listen(port, () => {
  console.log(`CORS proxy server listening at http://localhost:${port}`);
});



app.use('/api', (req, res) => {
  console.log(req.url);
  const url = `https://api.schiphol.nl${req.url}`;

  // İstekten gelen query parametrelerini al
  const iata = req.query.iata || ''; // iata parametresi

  // Proxy the request with headers
  req.pipe(request({
    url,
    headers: {
      'ResourceVersion': 'v4',
      'app_id': '9b1626cf',  // Replace with your actual app_id
      'app_key': '24947149ec3b2cc1fbe13a4efeab9ebc', 
      'iata': iata, // Query parametreyi header olarak ekle
    }
  })).pipe(res);
});


app.use('/api', (req, res) => {
  console.log(req.url);
  const url = `https://api.schiphol.nl${req.url}`;

  // İstekten gelen query parametrelerini al
  const iata = req.query.iata || ''; // iata parametresi

  // Proxy the request with headers
  req.pipe(request({
    url,
    headers: {
      'ResourceVersion': 'v4',
      'app_id': '9b1626cf',  // Replace with your actual app_id
      'app_key': '24947149ec3b2cc1fbe13a4efeab9ebc', 
      'airline': iata, // Query parametreyi header olarak ekle
    }
  })).pipe(res);
});





// app.use(express.json());


// mongoose.connect("mongodb://localhost:27017/flightDB", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
//   .catch((error) => console.error("MongoDB bağlantı hatası:", error));


// app.use("/api/flight-reservations", flightReservations);

// app.listen(port, () => {
//   console.log(`Sunucu ${port} portunda çalışıyor`);
// });