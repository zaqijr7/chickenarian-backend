const router = require("express").Router();
const inventoryControllers = require("../controllers/inventory");

router.post('/getInventory', inventoryControllers.getInventory);

module.exports = router;