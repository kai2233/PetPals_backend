const express = require('express');
const router = express.Router();
const petsController = require('../controllers/eventController');

router.get('/events', petsController.getAllEvents);
router.post('/event', petsController.createEvent);
router.put('/events/', petsController.updateEvent);
router.delete('/events/', petsController.deleteEvent);

module.exports = router;