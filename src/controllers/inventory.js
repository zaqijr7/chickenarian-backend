const inventoryModel = require('../models/inventory');
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { APP_KEY } = process.env;

exports.getInventory = async (req, res) => {
    const { userId } = req.body;

    if (!userId) return response(res, 400, false, `userId cannot be empty`);

    const result = await inventoryModel.getInventory({ userId })
    if (!result.length) return response(res, 400, false, `Inventory not found`);

    console.log(result);

    // const data = {
    //     id_user: emailExist[0].id_user,
    //     email: emailExist[0].email,
    //     username: emailExist[0].username,
    // }

    // console.log(APP_KEY, "<<< ini appkey");
    // const token = jwt.sign(data, APP_KEY);
    // return response(res, 200, true, 'Login Success', { t: token });

}

exports.insertInventoryData = async (req, res) => {
    const { userId, coins, totalChicken, totalEggs, totalFeeds, totalOthers } = req.body;

    if (!userId) return response(res, 400, false, `userId cannot be empty`);

    let profile = coins ?? "1200";
    console.log("COINS", profile);

    // const result = await inventoryModel.getInventory({ userId })
    // if (!result.length) return response(res, 400, false, `Inventory not found`);    
}