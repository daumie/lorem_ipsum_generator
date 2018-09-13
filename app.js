const http = require("http");
const router = require("./router.js");
const port = 8000;

// Create a webserver
http.createServer((request, response) => {
  router.header(request, response);
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);
