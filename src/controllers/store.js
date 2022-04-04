const storeModels = require('../models/store');
const walletModels = require('../models/wallet');
const inventoryModels = require('../models/inventory');
const transactionsModel = require('../models/transactions');
const response = require('../helpers/response');
const dateNowFormater = require('../helpers/dateNowFormater');

exports.buy = async (req, res) => {
  try {
    const { idItem, totalItem = 1 } = req.body;
    const { id_user } = req.userData
    const getItem = await storeModels.getItem({ id_item: idItem });
    if (!getItem.length) return response(res, 404, false, 'Item not found');
    const getWalletUser = await walletModels.getWalletUser(id_user);
    if (getItem[0].price * totalItem > getWalletUser[0].total_amount) return response(res, 400, false, "Your amount not enough");
    if (getItem[0].total_items < totalItem) return response(res, 400, false, "Stock items not enough");
    const updateItem = await storeModels.updateItem({ id_item: idItem, totalItem });
    if (!updateItem.affectedRows) return response(res, 400, false, "Transaction Failed");
    const costBuy = totalItem * getItem[0].price;
    await walletModels.updateWallet({ id_user, costBuy });

    //UPDATE INVENTORY USER
    if (getItem[0].type_of_item === 'pet') {
      const dataPet = {
        id_user: id_user,
        pet_name: 'test',
        status_evolution: 'baby',
        is_feed_today: dateNowFormater,
        evolution_date: dateNowFormater,
      }
      const insertPetUser = await inventoryModels.insertPetUser(dataPet);
      console.log(insertPetUser, "Insert pet to invetory user");
    } else {
      console.log(id_user);
      const getDataFeedUser = await inventoryModels.getDataFeedUser({ id_user, type_of_feed: getItem[0].type_of_feed });
      const dataFeed = {
        id_user: id_user,
        type_of_feed: getItem[0].type_of_feed,
        total_items: totalItem,
      }
      if (!getDataFeedUser.length) {
        await inventoryModels.insertFeedUser(dataFeed);
      } else {
        await inventoryModels.updateFeedUser(dataFeed);
      }
    }
    const insertHistoryTransaction = await transactionsModel.insertHistoryTransaction({id_user, id_item: idItem, total_transactions: totalItem, total_price: costBuy})
    // console.log(getItem, "ini wallet user");
    console.log(insertHistoryTransaction, "<<<<< history transaction");

    return response(res, 200, true, `Buy the ${getItem[0].type_of_item} success`)
  } catch (error) {
    console.log(error.message);
  }
}