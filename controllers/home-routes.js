const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const { Event, Comment, User, Guest } = require('../models');
const sharp = require('sharp');

// GET all events for homepage
router.get('/', async (req, res) => {
 try {
   const userdata = await User.findByPk(req.session.currentUser?.userId);
   const currentUser = userdata?.get({ plain: true }).username;

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

   // Remove from the session returnTo varuable which contains originalUrl
   delete req.session.returnTo;

   res.render('homepage', {
     loggedIn: req.session.currentUser?.loggedIn,
     events: events.reverse(),
     currentUser,
   });
 } catch (err) {
   res.status(500).json(err.message);
 }
});

// GET an event for event details page
router.get('/events/:id', async (req, res) => {
 try {
   const userdata = await User.findByPk(req.session.currentUser?.userId);
   const currentUser = userdata?.get({ plain: true }).username;

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

   // Add to the comments array the current user id
   event.comments = event.comments.map((el) => ({
     ...el,
     currentUserId: req.session.currentUser?.userId,
   }));

   // Check if the current user is a guest for this event
   const isGuest = event.eventGuests
     .map((el) => el.id)
     .includes(req.session.currentUser?.userId);

   // Save to the session originalUrl of this page
   req.session.returnTo = req.originalUrl;

   sharp(event.bufferData)
     .resize(700)
     .toBuffer()
     .then((resizedBuffer) => {
       const base64Image = resizedBuffer.toString('base64');
       const imageSrc = `data:image/jpeg;base64,${base64Image}`;

       res.render('eventDetails', {
         loggedIn: req.session.currentUser?.loggedIn,
         currentUserId: req.session.currentUser?.userId,
         ...event,
         imageSrc,
         isGuest,
         currentUser,
       });
     });
 } catch (err) {
   res.status(500).json(err.message);
 }
});

// GET all events for user's dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
 try {
   const userdata = await User.findByPk(req.session.currentUser?.userId);
   const currentUser = userdata?.get({ plain: true }).username;

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
     currentUser,
   });
 } catch (err) {
   res.status(500).json(err.message);
 }
});

// Create event page
router.get('/dashboard/create', async (req, res) => {
 try {
   const userdata = await User.findByPk(req.session.currentUser?.userId);
   const currentUser = userdata?.get({ plain: true }).username;

   res.render('eventForms', {
     isCreate: true,
     loggedIn: req.session.currentUser?.loggedIn,
     idDashboard: true,
     currentUser,
   });
 } catch (err) {
   res.status(500).json(err.message);
 }
});

// Update event page
router.get('/dashboard/update/:id', async (req, res) => {
 try {
   const userdata = await User.findByPk(req.session.currentUser?.userId);
   const currentUser = userdata?.get({ plain: true }).username;

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
     currentUser
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

 res.render('login', { returnTo: req.session.returnTo });
});

module.exports = router;
