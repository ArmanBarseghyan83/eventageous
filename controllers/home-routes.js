const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const { Event, Comment, User, Guest } = require('../models');
const sharp = require('sharp');

// GET all events for homepage
router.get('/', async (req, res) => {
  try {
    const eventsData = await Event.findAll({
      include: [{ model: User }],
    });

    const events = await Promise.all(
      eventsData.map(async (el) => {
        const imageSrc = await sharp(el.bufferData)
          .resize(600)
          .toBuffer()
          .then((resizedBuffer) => {
            const base64Image = resizedBuffer.toString('base64');
            return `data:image/jpeg;base64,${base64Image}`;
          });

        return {
          ...el.get({ plain: true }),
          imageSrc,
        };
      })
    );

    res.render('homepage', {
      loggedIn: req.session.currentUser?.loggedIn,
      events: events.reverse(),
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET an event for event details page
router.get('/events/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: [{ model: User }],
        },
        { model: User, as: 'eventGuests' },
      ],
    });
    if (!eventData) {
      res.status(404).json({ message: 'No event with this id!' });
      return;
    }

    const event = eventData.get({ plain: true });

    sharp(event.bufferData)
      .resize(700)
      .toBuffer()
      .then((resizedBuffer) => {
        const base64Image = resizedBuffer.toString('base64');
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;

        res.render('eventDetails', {
          loggedIn: req.session.currentUser?.loggedIn,
          ...event,
          imageSrc,
        });
      });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET all events for user's dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const eventsData = await Event.findAll({
      where: { userId: req.session.currentUser.userId },
      include: [{ model: User }],
    });

    const events = await Promise.all(
      eventsData.map(async (el) => {
        const imageSrc = await sharp(el.bufferData)
          .resize(600)
          .toBuffer()
          .then((resizedBuffer) => {
            const base64Image = resizedBuffer.toString('base64');
            return `data:image/jpeg;base64,${base64Image}`;
          });

        return {
          ...el.get({ plain: true }),
          imageSrc,
        };
      })
    );

    res.render('dashboard', {
      loggedIn: req.session.currentUser?.loggedIn,
      idDashboard: true,
      events: events.reverse(),
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Create event page
router.get('/dashboard/create', async (req, res) => {
  res.render('eventForms', {
    isCreate: true,
    loggedIn: req.session.currentUser?.loggedIn,
    idDashboard: true,
  });
});

// Update event page
router.get('/dashboard/update/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);
    if (!eventData) {
      res.status(404).json({ message: 'No event with this id!' });
      return;
    }

    const event = eventData.get({ plain: true });

    res.render('eventForms', {
      loggedIn: req.session.currentUser?.loggedIn,
      idDashboard: true,
      ...event,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
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
