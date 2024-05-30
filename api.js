const express = require('express');
const client = require('./connection');
const cors = require('cors');

const app = express();
const PORT = 3300;

// CORS yapılandırması
app.use(cors());

// JSON verilerini işle
app.use(express.json());

// Veritabanına bağlan
client.connect()
  .then(() => {
    console.log("Connected to the database");



    // Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(`Server is now listening at port ${PORT}`);
    });

  })
  .catch(err => {
    console.error('Database connection error', err.stack);
  });

      // API endpoint
      app.get('/users', (req, res) => {
        client.query('SELECT * FROM "Users"', (err, result) => {
          if (!err) {
            res.send(result.rows);
          } else {
            console.error(err);
            res.status(500).send('Database query error');
          }
        });
      });