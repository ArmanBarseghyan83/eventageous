const router = require('express').Router();
const { Event } = require('../../models');

const sharp = require('sharp');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new event
router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;
  const eventBody = { ...req.body };

  if (!file) {
    res.status(400).send('No file uploaded');
  } else {
    sharp(file.buffer)
      .resize(600)
      .toBuffer()
      .then(async (resizedBuffer) => {
        try {
          const event = await Event.create({
            ...eventBody,
            userId: req.session.currentUser.userId,
            bufferData: resizedBuffer,
          });

          const eventId = event.get({ plain: true }).id;

          res.status(200).redirect(`/events/${eventId}`);
        } catch (err) {
          res.status(400).json(err.message);
        }
      });
  }
});

// Update an event by its `id` value
router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const event = await Event.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete an event by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
