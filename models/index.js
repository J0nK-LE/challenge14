const User = require('./User');
const Comment = require('./Comment');
const Child = require('./Child');

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.hasMany(Child, {
  foreignKey: 'comment_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Child.belongsTo(Comment, {
  foreignKey: 'user_id',
});

module.exports = { User, Comment, Child };
