const express = require('express');
const router = express.Router();
const petRoutes = require('./petRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/pet', petRoutes);
router.use('/event', eventRoutes);

export default router;