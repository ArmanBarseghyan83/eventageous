const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Guest = require('./Guest');

Event.belongsTo(User);
User.hasMany(Event);

Comment.belongsTo(Event);
Event.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

User.belongsToMany(Event, { through: Guest });
Event.belongsToMany(User, { through: Guest, as: 'eventGuests' });

module.exports = { User, Event, Comment };
