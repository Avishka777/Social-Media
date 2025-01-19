// models/index.js
const sequelize = require('../config/database');
const User = require('./user.model');
const Post = require('./post.model');

// Initialize models
const models = {
  User: User.init(sequelize),
  Post: Post.init(sequelize),
};

// Define associations
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  ...models,
  sequelize,
};
