const storeModels = require('../models/store');
const walletModels = require('../models/wallet');
const inventoryModels = require('../models/inventory');
const transactionsModel = require('../models/transactions');
const response = require('../helpers/response');
const dateNowFormater = require('../helpers/dateNowFormater');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

const getItem = async (res, idItem) => {
  try {
    const item = await storeModels.getItem({ id_item: idItem });
    if (!item.length) return response(res, 404, false, 'Item not found');
    return item[0];
  } catch (error) {
    return response(res, 500, false, 'Internal server error');
  }
}

const updateWallet = async (res, item, id_user) => {
  try {
    const costBuy = item.price;
    const wallet = await walletModels.getWalletUser(id_user);
    if (!wallet) return response(res, 404, false, 'Item not found');
    if (costBuy > wallet[0].total_amount) return response(res, 400, false, 'Insufficient balance');
    const updateWallet = await walletModels.updateWallet({ id_user, costBuy });
    if (!updateWallet) return response(res, 400, false, 'Fail to update wallet');
    console.log("Wallet updated, affectedRows: ", updateWallet.affectedRows);
  } catch (error) {
    return response(res, 500, false, 'Internal server error');
  }
}

const updateInventory = async (obj) => {
  try {
    console.log("1");
    const { userId, chicken, egg, feed, other, res } = obj;

    if (!userId) return response(res, 400, false, `userId cannot be empty`);

    console.log("2");

    const chickenAmount = chicken ?? 0;
    const eggAmount = egg ?? 0;
    const feedAmount = feed ?? 0;
    const otherAmount = other ?? 0;

    console.log("3");

    const result = await inventoryModels.getInventory({ userId })
    if (!result.length) return response(res, 400, false, `Inventory not found`);

    console.log("4");

    const userInventory = result[0];

    console.log(userInventory.total_chickens + chickenAmount);
    console.log(userInventory.total_eggs + eggAmount);
    console.log(userInventory.total_feeds + feedAmount);
    console.log(userInventory.total_others + otherAmount);

    const data = {
      inventory_id: userInventory.inventory_id,
      user_id: userInventory.user_id,
      total_chickens: userInventory.total_chickens + chickenAmount,
      total_eggs: userInventory.total_eggs + eggAmount,
      total_feeds: userInventory.total_feeds + feedAmount,
      total_others: userInventory.total_others + otherAmount,
    }

    console.log("5");

    const resultInsertInitialData = await inventoryModels.updateInventory(data);
    console.log("6");
    console.log("resultInsertInitialData", resultInsertInitialData);
    if (!resultInsertInitialData) return response(res, 400, false, `Update iinventory failed`);
    console.log("7");
  } catch (error) {
    return response(obj.res, 500, true, 'Server error');
  }
}

const insertPets = async (arg) => {
  try {
    const { res, id_user, item } = arg;

    const randomName = uniqueNamesGenerator({ dictionaries: [names] });

    const dataPet = {
      id_user: id_user,
      pet_name: randomName,
      evolutionStage: 0,
      evolutionProgress: 0,
      evolution_date: null,
      updatedAt: dateNowFormater,
      createdAt: dateNowFormater,
      last_feed: null,
      is_dead: 0,
      market_id: item.id_item
    }

    const insertPetUser = await inventoryModels.insertPetUser(dataPet);
    if (!insertPetUser) return response(res, 400, false, 'Insert not success');

    const obj = {
      userId: id_user,
      chicken: item.type === 2 ? 1 : 0,
      egg: item.type === 1 ? 1 : 0,
      res: res
    }

    await updateInventory(obj);
    console.log("Pet inserted, Id: ", insertPetUser.insertId);
  } catch (error) {
    return response(arg.res, 500, false, 'Internal server error');
  }
}

const insertItems = async (arg) => {
  try {
    const { res, id_user, item } = arg;

    const getDataFeedUser = await inventoryModels.getDataFeedUser({ id_user, market_id: item.id_item });

    if (!getDataFeedUser.length) {
      const insertItem = await inventoryModels.insertFeedUser({
        id_user: id_user,
        market_id: item.id_item,
        total_items: 1,
      });
      if (!insertItem) return response(res, 400, false, 'Insert not success');
      console.log("Item inserted, Id: ", insertItem.insertId);

    } else {
      const updateItem = await inventoryModels.updateFeedUser({
        id_user: id_user,
        market_id: item.id_item,
        total_items: getDataFeedUser[0].total_items + 1,
      });
      if (!updateItem) return response(res, 400, false, 'Insert not success');
      console.log("Item updated, affectedRows: ", updateItem.affectedRows);
    }

    const obj = {
      userId: id_user,
      feed: item.type === 3 ? 1 : 0,
      other: item.type === 4 ? 1 : 0,
      res: res
    }
    await updateInventory(obj);
  } catch (error) {
    return response(arg.res, 500, false, 'Internal server error');
  }
}

const insertData = async (res, id_user, item) => {
  const obj = { res, id_user, item }

  let typeToInsert = {
    "1": insertPets.bind(obj),
    "2": insertPets.bind(obj),
    "3": insertItems.bind(obj),
    "4": insertItems.bind(obj)
  }

  typeToInsert[item.type.toString()](obj);
}

const recordTransaction = async (res, id_user, item) => {
  try {
    const insertTransactions = await transactionsModel.insertTransactions({ user_id: id_user, transaction_date: dateNowFormater })
    if (!insertTransactions) return response(res, 400, false, 'Insert transaction not success');

    const transactionArr = await transactionsModel.selectLastTransaction();
    if (!transactionArr) return response(res, 400, false, 'Failed to get tx Id');
    const lastTransactionDetailId = transactionArr[0];

    let lastTxId = 0;

    for (key in lastTransactionDetailId) {
      if (lastTransactionDetailId.hasOwnProperty(key)) {
        lastTxId = lastTransactionDetailId[key];
      }
    }

    const insertTransactionDetails = await transactionsModel.insertTransactionDetail({ user_id: id_user, market_id: item.id_item, quantity: 1, price: item.price, transaction_id: lastTxId });
    if (!insertTransactionDetails) return response(res, 400, false, 'Insert transaction details not success');
    console.log("Transaction inserted, Id: ", insertTransactionDetails.insertId);
  } catch (error) {
    return response(res, 500, false, 'Internal server error');
  }
}

exports.buy = async (req, res) => {
  try {
    const { idItem, id_user } = req.body;

    const item = await getItem(res, idItem);
    await updateWallet(res, item, id_user);
    await insertData(res, id_user, item)
    await recordTransaction(res, id_user, item);

    return response(res, 200, true, `Success buy ${item.name}`)
  } catch (error) {
    console.log(error.message);
    return response(res, 500, false, 'Internal server error');
  }
}

exports.getItems = async (req, res) => {
  try {
    const items = await storeModels.getItems();
    const data = {
      length: items.length,
      items: items
    }
    if (items) return response(res, 200, true, 'Success get items', data);
  } catch (error) {
    console.log(error.message);
    return response(res, 400, false);
  }
}