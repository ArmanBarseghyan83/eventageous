const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');

Event.belongsTo(User);
User.hasMany(Event);

Comment.belongsTo(Event);
Event.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = { User, Event, Comment };
