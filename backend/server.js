const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/post.routes");
const likeRoutes = require("./routes/like.route");
const commentRoutes = require("./routes/comment.route");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);


// Test the connection and sync models
sequelize
  .sync({ force: false }) // Change to `true` during development to reset tables
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.log("Error syncing database: " + err));
