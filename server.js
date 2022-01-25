const http = require("http");
const app = require("./index");
const db = require("./src/db");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port} `);
  db.connection_db();
});
