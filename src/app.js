const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", (req, res) => {
  res.send(req.body);
});

app.post("/login", (req, res) => {
  res.send(req.body);
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
