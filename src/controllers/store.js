const storeModels = require('../models/store');
const walletModels = require('../models/wallet');
const response = require('../helpers/response');

exports.buy = async (req, res) => {
  try {
    const { idItem, totalItem = 1 } = req.body;
    const getItem = await storeModels.getItem({ id_item: idItem });
    if (!getItem.length) return response(res, 404, false, 'Item not found');
    const getWalletUser = await walletModels.getWalletUser(req.userData.id_user);
    if (getItem[0].price * totalItem > getWalletUser[0].total_amount) return response(res, 400, false, "Your amount not enough");
    if (getItem[0].total_items < totalItem) return response(res, 400, false, "Stock items not enough");
    const updateItem = await storeModels.updateItem({ id_item: idItem, totalItem })
    console.log(updateItem);
    // console.log(getItem, "ini wallet user");
    res.send('ok');
  } catch (error) {
    console.log(error.message);
  }
}