const express = require("express");
const bodyParser = require("body-parser");

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start the Server
const PORT = 3000; // Change the port if needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
