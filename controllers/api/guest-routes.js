const router = require('express').Router();
const Guest = require('../../models/Guest');

// Crate a new guest 
router.post('/', async (req, res) => {

  try {
    const guest = await Guest.create({
      user_id: req.session.currentUser.userId,
      event_id: req.body.event_id,
    });
    res.status(200).json(guest);
  } catch (err) {
    res.status(409).json(err);
  }
});

// delete the guest 
router.delete('/', async (req, res) => {

  try {
    const guest = await Guest.destroy({
      where: { user_id: req.body.id },
    });
    res.status(200).json(guest);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;