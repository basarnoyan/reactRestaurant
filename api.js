const client = require('./connection.js');
const express = require('express');
const app = express();

const PORT = 3300;

app.listen(PORT, () => {
  console.log(`Server is now listening at port ${PORT}`);
});

client.connect()
  .then(() => {
    console.log("Connected to the database");

    app.get('/users', (req, res) => {
      client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
          res.send(result.rows);
        } else {
          console.error(err);
          res.status(500).send('Database query error');
        }
      });
    });

  })
  .catch(err => {
    console.error('Database connection error', err.stack);
  });

// Bu kısımda client.end() fonksiyonunu kullanmıyoruz,
// çünkü bu, bağlantıyı kapatır ve sunucu çalışırken bunu istemeyiz.
