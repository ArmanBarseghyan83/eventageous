const router = require('express').Router();
const withAuth = require('../utils/auth.js');

// GET all events for homepage
router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.currentUser?.loggedIn,
  });
});

// GET an event for event details page
router.get('/events/:id', async (req, res) => {
  res.send('event details');
});

// GET all events for user's dashboard page
router.get('/dashboard', async (req, res) => {
  res.send('daschboard page');
});

// Create event page
router.get('/dashboard/create', async (req, res) => {
  res.render('eventForms', { isCreate: true });
});

// Update event page
router.get('/dashboard/update/:id', async (req, res) => {
  res.send('create event form page');
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.currentUser?.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
