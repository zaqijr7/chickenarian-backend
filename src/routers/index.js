const router = require("express").Router();
const auth = require("./auth");
const pets = require("./pets");
const store = require("./store");
const inventory = require("./inventory");

router.use('/auth', auth);
router.use('/pets', pets);
router.use('/store', store);
router.use('/inventory', inventory);

module.exports = router;
