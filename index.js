const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8080;

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to EZBank!");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port} `);
});
