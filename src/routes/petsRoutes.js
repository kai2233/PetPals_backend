const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

router.get('/', petsController.getAllPets);
router.get('/details', petsController.petDetail);
router.post('/create', petsController.createPet);
router.delete('/delete', petsController.deletePet);
router.put('/update', petsController.updatePet);

module.exports = router;