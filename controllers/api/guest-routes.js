const router = require('express').Router();
const Guest = require('../../models/Guest');

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

module.exports = router;
