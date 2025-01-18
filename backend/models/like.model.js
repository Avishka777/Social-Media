const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Like = sequelize.define("Like", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Like;
