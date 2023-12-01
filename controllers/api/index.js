const router = require('express').Router();

const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
const commentRoutes = require('./comment-routes');
const guestRoutes = require('./guest-routes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/comments', commentRoutes);
router.use('/guests', guestRoutes)

module.exports = router;