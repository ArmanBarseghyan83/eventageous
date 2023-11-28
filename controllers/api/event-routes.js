const router = require('express').Router();
const { Event } = require('../../models');

// Create a new event
router.post('/', async (req, res) => {

    res.send('json/created-event')
});

// Update an event by its `id` value
router.put('/:id', async (req, res) => {
  
    res.send('json/udated-event')
});

// Delete an event by its `id` value
router.delete('/:id', async (req, res) => {

    res.send('json/deletd-event')
});

module.exports = router;
