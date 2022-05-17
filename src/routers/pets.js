const router = require("express").Router();
const petControllers = require("../controllers/pets");

router.post('/feeding', petControllers.feeding);
router.get('/all', petControllers.getPets);
router.post('/feed', petControllers.feedPet);
router.post('/evolve', petControllers.evolveChicken);
router.post('/crack', petControllers.crackEgg);

module.exports = router;