require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB, exiting", err);
    process.exit(1);
  });
