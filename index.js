const http = require("http");
const app = require("./server/app");
const server = http.createServer(app);

const { PORT } = process.env;
const port = process.env.PORT || PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});