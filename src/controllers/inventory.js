const inventoryModel = require('../models/inventory');
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { APP_KEY } = process.env;

exports.getInventory = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return response(res, 400, false, `userId cannot be empty`);

    const result = await inventoryModel.getInventory({ userId })
    if (!result.length) return response(res, 400, false, `Inventory not found`);

    console.log(result[0]);

    const data = {
      inventory_id: result[0].inventory_id,
      user_id: result[0].user_id,
      total_chickens: result[0].total_chickens,
      total_eggs: result[0].total_eggs,
      total_feeds: result[0].total_feeds,
      total_others: result[0].total_others
    }

    return response(res, 200, true, 'Success get inventory', data);
  } catch (error) {
    return response(res, 500, true, 'Server error');
  }
}