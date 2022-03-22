const router = require("express").Router();
const storeControllers = require("../controllers/store");
const auth = require('../middlewares/authCheck');
router.put('/buy', auth.authCheck, storeControllers.buy);

module.exports = router;