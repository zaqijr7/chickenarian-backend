const router = require("express").Router();
const storeControllers = require("../controllers/store");
const auth = require('../middlewares/authCheck');

router.get('/', storeControllers.getItems);
// router.put('/buy', auth.authCheck, storeControllers.buy);
router.put('/buy', storeControllers.buy);

module.exports = router;