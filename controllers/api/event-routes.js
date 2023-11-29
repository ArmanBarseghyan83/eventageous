const router = require('express').Router();
const { Event } = require('../../models');

const sharp = require('sharp');

const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new event
router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;

  const eventBody = {
    ...req.body
  }

  console.log(eventBody)

  if (!file) {
    res.status(400).send('No file uploaded');
  } else {
    sharp(file.buffer)
      .resize(300)
      .toBuffer()
      .then((resizedBuffer) => {
        // save to the database
        console.log(resizedBuffer);
      });

    // get from the database
    sharp(file.buffer)
      .resize(600)
      .toBuffer()
      .then((resizedBuffer) => {
        const base64Image = resizedBuffer.toString('base64');
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;

        res.render('homepage', { imageSrc });
      });
  }
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
