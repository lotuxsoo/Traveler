const express = require("express");
const app = express();

const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/welcome", function (req, res) {
  res.send("Welcome");
});

var pool = mysql.createPool({
  //host: '127.0.0.1',
  host: "localhost",
  user: "root",
  password: "root",
  database: "traveler",
  connectionLimit: 10,
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  const values = [req.body.username, req.body.email, req.body.password];
  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.post("/login", (req, res) => {
  const sql2 = "SELECT * FROM user WHERE email = ? and password = ?";
  const values = [req.body.email, req.body.password];
  pool.query(sql2, values, (err, result) => {
    if (err) throw error;
    if (result.length > 0) {
      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.listen(3001, () => {
  console.log(`Listening`);
});
