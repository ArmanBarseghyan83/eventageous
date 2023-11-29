const router = require('express').Router();
const { Event, Comment, User } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
  
    res.send('json/all-comments')
});

// Create a new comment
router.post('/', async (req, res) => {
  
    res.send('json/new-comment')
});

module.exports = router;
