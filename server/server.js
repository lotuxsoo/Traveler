const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 80;
const fs = require('fs');
const hostname = "localhost";
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get("/welcome", function (req, res) {
    res.send("Welcome");
  });

var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'traveler',
    connectionLimit: 10,
});

app.post("/signup", (req, res) => { 
    const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    const values = [
        req.body.name,
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
    const tempResult = result.filter((item) => item.image != null);
    const updatedResult = tempResult.map(item => {
      const base64Image = item.image.toString('base64');
      return { ...item, image: base64Image };
    });
    return res.json(updatedResult);
  });
});

app.post("/login", (req, res) => {
  const sql2 = 'SELECT * FROM user WHERE name = ? and password = ?';
  const values = [
    req.body.name,
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
  const sql = 'DELETE FROM user WHERE name = ?';
  pool.query(sql, req.body.name, (error, result) => {
      if (error) throw error;
      return res.json(result);
  });
});

app.post("/show", (req, res) => {
  let sql = "SELECT * FROM post";
  let values = [];
  if (req.body.key && req.body.key !== '') {
    sql += ' WHERE spot LIKE ? OR name LIKE ? or review LIKE ?';
    values.push('%' + req.body.key + '%');
    values.push('%' + req.body.key + '%');
    values.push('%' + req.body.key + '%');
  }
  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    const tempResult = result.filter((item) => item.image != null);
    const updatedResult = tempResult.map(item => {
      const base64Image = item.image.toString('base64');
      return { ...item, image: base64Image };
    });
    return res.json(updatedResult);
  });
});

app.post("/finding", (req, res) => {
  let sql = "SELECT * FROM post WHERE spot = ?";
  pool.query(sql, req.body.id, (error, result) => {
    if (error) throw error;

    res.json(result);
  });
});

app.post("/like", (req, res) => {
  const sql = "UPDATE post SET `like` = ? WHERE spot = ?";
  const values = [req.body.current, req.body.spot];
  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    res.json({ like:updatedLike });
  });
});

app.post("/reply", (req, res) => {
  const sql = "INSERT INTO reply (name, text, spot) values (?, ?, ?)";
  const values = [req.body.name, req.body.text, req.body.spot];
  pool.query(sql, values, (error, result) => {
    if (error) throw error;
    const sql2 = "SELECT * FROM reply WHERE spot = ?";
    pool.query(sql2, req.body.spot, (error, result) => {
      if(error) error;
    })
    return res.json(result);
  })
});

app.post("/add", (req, res) => {
  const { _parts } = req.body;
  const imagePath = "/tmp/image.jpg";

  for (const item of _parts) {
    const [key, value] = item;

    // Process each item based on its key
    switch (key) {
      case 'spot':
        console.log("Spot:", value);
        spot = value;
        break;
      case 'review':
        console.log("Review:", value);
        review = value;
        break;
      case 'favorite':
        console.log("Favorite:", value);
        favorite = value;
        break;
      case 'name':
        console.log("Name:", value);
        name = value;
        break;
      case 'image':
        console.log("Image:", value);
        image = value;
        break;
      default:
        break;
    }
  }

  const imageBuffer = Buffer.from(image._bodyInit._data.name, 'base64');

  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) throw err;
    const sql = 'INSERT INTO post (spot, review, favorite, name, image, day) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [spot, review, favorite, "A", fs.readFileSync(imagePath), "2023-07-12"];
    pool.query(sql, values, (error, result) => {
        if (error) throw error;
        console.log("test: ", result);
        return res.json(result);
    })
  });
});


app.post("/todo", (req, res) => {
  const sql = 'SELECT * FROM todo WHERE name = ?';
  pool.query(sql, req.body.name, (error, result) => {
    if (error) throw error;
    return res.json(result);
  })
});

app.post("/addtodo", (req, res) => {
  const sql = 'INSERT INTO todo (todo, name) VALUES (?, ?)';
  const values = [req.body.text, req.body.name];
  pool.query(sql, req.body.name, (error, result) => {
    if (error) throw error;
    return res.json(result);
  })
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
