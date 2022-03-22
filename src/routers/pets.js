const router = require("express").Router();
const petControllers = require("../controllers/pets");

router.post('/feeding', petControllers.feeding);

module.exports = router;