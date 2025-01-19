const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importing cors
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/post.routes");
const likeRoutes = require("./routes/like.route");
const commentRoutes = require("./routes/comment.route");
require("./models/associations");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // This enables CORS for all routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);

// Test the connection and sync models
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
