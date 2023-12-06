const router = require('express').Router();
const { Comment } = require('../../models');

// Create or update comment
router.post('/', async (req, res) => {
  // If the body contains id, update the comment, else create a new camment.
  if (!req.body.id) {
    try {
      const comment = await Comment.create({
        content: req.body.content,
        eventId: req.body.eventId,
        userId: req.session.currentUser.userId,
      });
      res.status(200).json(comment);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    try {
      const comment = await Comment.update(
        { content: req.body.content, isEdited: true },
        {
          where: { id: req.body.id },
        }
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

// Delete the comment
router.delete('/', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: { id: req.body.id },
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
