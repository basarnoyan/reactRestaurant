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

    // Menü verilerini getirme endpoint'i
    app.get('/menu', (req, res) => {
      client.query('SELECT * FROM "Menu"', (err, result) => {
        if (!err) {
          res.send(result.rows);
        } else {
          console.error(err);
          res.status(500).send('Database query error');
        }
      });
    });

    // Sepet verilerini getirme endpoint'i
    app.get('/cart', (req, res) => {
      client.query('SELECT * FROM cart', (err, result) => {
        if (!err) {
          res.send(result.rows);
        } else {
          console.error(err);
          res.status(500).send('Database query error');
        }
      });
    });

    // Ürünü sepete ekleme endpoint'i
    app.post('/cart', (req, res) => {
      const { name, image, price } = req.body;
      const query = 'INSERT INTO cart (name, image, price) VALUES ($1, $2, $3)';
      client.query(query, [name, image, price], (err, result) => {
        if (!err) {
          res.send('Item added to cart');
        } else {
          console.error(err);
          res.status(500).send('Database query error');
        }
      });
    });

    // Sepet öğesini silme endpoint'i
    app.delete('/cart/:id', (req, res) => {
      const id = req.params.id;
      const query = 'DELETE FROM cart WHERE id = $1';
      client.query(query, [id], (err, result) => {
        if (!err) {
          res.send('Item removed from cart');
        } else {
          console.error(err);
          res.status(500).send('Database query error');
        }
      });
    });

    // Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(`Server is now listening at port ${PORT}`);
    });

  })
  .catch(err => {
    console.error('Database connection error', err.stack);
  });
