// models/associations.js
const User = require('./user.model');
const Post = require('./post.model');

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
