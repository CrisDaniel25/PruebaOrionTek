const http = require("http");
const app = require("./server/app");
const port = process.env.PORT || 3030;

if (process.env.VERCEL !== "1") {
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
