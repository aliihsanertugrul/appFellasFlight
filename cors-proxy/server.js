const express = require('express');
const request = require('request');
const app = express();
const port = 3001;

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
