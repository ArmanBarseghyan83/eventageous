const router = require('express').Router();
const withAuth = require('../utils/auth.js');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  

    res.render('homepage', {
      loggedIn: req.session.currentUser?.loggedIn,
    });
 
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
