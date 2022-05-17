const router = require("express").Router();
const inventoryControllers = require("../controllers/inventory");

router.post('/getInventory', inventoryControllers.getInventory);
router.post('/insertInventoryData', inventoryControllers.insertInventoryData);

module.exports = router;