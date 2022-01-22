const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const apiRouter = require("./src/routes");

const db = require("./src/db");

const port = process.env.PORT || 8080;

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to EZBank!");
});

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send({ msg: "Invalid Request", code: err.message });
  } else {
    next();
  }
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "This endpoint doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port} `);
  db.connection_db();
});
