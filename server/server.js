const express = require('express');
const app = express();

const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/welcome", function (req, res) {
  res.send("Welcome");
});

var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'traveler',
  connectionLimit: 10
});


app.post("/signup", (req, res) => { 
    const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    pool.query(sql, values, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

app.post("/finding", (req, res) => {
  let sql = "SELECT * FROM post WHERE spot = ?";
  pool.query(sql, req.body.id, (error, result) => {
    if (error) throw error;
    let jj = res.json(result);
    console.log("w22222");
    console.log(result);
  });
});

app.post("/login", (req, res) => {
    const sql2 = 'SELECT * FROM user WHERE email = ? and password = ?';
    const values = [
      req.body.email,
      req.body.password
    ];
    pool.query(sql2, values, (err, result) => {
        if (err) throw error;
        if (result.length > 0) {
          return res.json({Login: true});
        } else {
          return res.json({Login: false});
        }
    });
});

app.post("/signout", (req, res) => { 
    const sql = 'DELETE FROM user WHERE email = "aa"';
    pool.query(sql, (error, result) => {
        if (error) throw error;
    });
});

app.post("/show", (req, res) => {
  let sql = 'SELECT * FROM post';
  let values = [];
  if (req.body.key && req.body.key !== '') {
    sql += ' WHERE spot = ?';
    values.push(req.body.key);
  }

  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    const updatedResult = result.map(item => {
      const base64Image = item.image.toString('base64');
      return { ...item, image: base64Image };
    });
    return res.json(updatedResult);
  });
});

app.post("/like", (req, res) => {
  const sql = 'UPDATE post SET `like` = ? WHERE spot = ?';
  const values = [ req.body.current, req.body.spot ];
  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    req.json({ like:updatedLike });
  });
});


app.post("/reply", (req, res) => {
  const sql = 'INSERT INTO reply (name, text, spot) values (?, ?, ?)';
  const values = [req.body.name, req.body.text, req.body.spot];
  pool.query(sql, values, (error, result) => {
    if(error) throw error;
    const sql2 = 'SELECT * FROM reply WHERE spot = ?';
    pool.query(sql2, req.body.spot, (error, result) => {
      if(error) error;
    })
    return req.json(result);
  })
})

app.post("/add", (req, res) => {
  const sql = 'INSERT INTO post (`spot`, `rating`, `review`, `like`, `name`, `image`) values (?, ?, ?, ?, ?, ?)';
  const values = [req.body.spot, req.body.rating, req.body.review, 0, req.body.name, req.body,image];
  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    req.json(result);
  })
})

app.listen(3001, '127.0.0.1', () => {
  console.log(`Listening`);
});