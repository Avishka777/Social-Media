const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

// Define User-Post relationship
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Define Post-Comment relationship
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Define User-Comment relationship (if needed)
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Post, Comment };
