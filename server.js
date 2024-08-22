const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'insert my db password',
  database: 'auction_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

app.get('/', (req, res) => {
  res.send('Auction Site API');
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  
    
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, email], (err, result) => {
      if (err) {
        res.status(500).send('Error registering user');
        throw err;
      }
      res.send('User registered successfully');
    });
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json({ login: true, user: result[0] });
      } else {
        res.json({ login: false });
      }
    });
  });

  app.post('/auctions', (req, res) => {
    const { title, description, starting_price, end_time, user_id } = req.body;
    const sql = 'INSERT INTO auctions (title, description, starting_price, current_price, end_time, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, starting_price, starting_price, end_time, user_id], (err, result) => {
      if (err) {
        res.status(500).send('Error creating auction');
        throw err;
      }
      res.send('Auction created successfully');
    });
  });
  app.get('/auctions', (req, res) => {
    const sql = 'SELECT * FROM auctions WHERE end_time > NOW()';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send('Error fetching auctions');
        throw err;
      }
      res.json(results);
    });
  });
  
  
  app.post('/auctions/:id/bid', (req, res) => {
    const { id } = req.params;
    const { bid_amount, user_id } = req.body;
    db.query('SELECT current_price FROM auctions WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(500).send('Error fetching auction');
        throw err;
      }
      if (results.length > 0 && bid_amount > results[0].current_price) {
        const sql = 'UPDATE auctions SET current_price = ? WHERE id = ?';
        db.query(sql, [bid_amount, id], (err, result) => {
          if (err) {
            res.status(500).send('Error placing bid');
            throw err;
          }
          const sqlBid = 'INSERT INTO bids (auction_id, user_id, bid_amount, bid_time) VALUES (?, ?, ?, NOW())';
          db.query(sqlBid, [id, user_id, bid_amount], (err, result) => {
            if (err) {
              res.status(500).send('Error recording bid');
              throw err;
            }
            res.send('Bid placed successfully');
          });
        });
      } else {
        res.status(400).send('Bid amount is too low');
      }
    });
  });
  
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});