const usersModel = require('../models/users');
const walletsModel = require('../models/wallet');
const inventoryModel = require('../models/inventory');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { APP_KEY } = process.env;
const dateNowFormater = require('../helpers/dateNowFormater');
const { uniqueNamesGenerator, names } = require('unique-names-generator');


const updateUserGameData = async (arg) => {
  try {
    const { res, user, wallet } = arg;

    const randomName = uniqueNamesGenerator({ dictionaries: [names] });

    const dataPet = {
      id_user: user.insertId,
      pet_name: randomName,
      evolutionStage: 0,
      evolutionProgress: 0,
      evolution_date: null,
      updatedAt: dateNowFormater,
      createdAt: dateNowFormater,
      last_feed: null,
      is_dead: 0,
      market_id: 1
    }

    const insertPetUser = await inventoryModel.insertPetUser(dataPet);
    if (!insertPetUser) return response(res, 400, false, 'Insert not success');

    const updateItem = await inventoryModel.updateFeedUser({
      id_user: user.insertId,
      market_id: 4,
      total_items: 20,
    });

    if (!updateItem) return response(res, 400, false, 'Update not success');

    await inventoryModel.insertToInventory({ user_id: user.insertId, total_chickens: 0, total_eggs: 1, total_feeds: 20, total_others: 0, wallet_id: wallet.insertId })

  } catch (error) {
    console.log("ERROR", error);
    return response(res, 500, true, 'Server error');
  }
}

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) return response(res, 400, false, `Field cannot be empty`);

  try {
    //check username
    const userExist = await usersModel.getUserByCondition({ username });
    if (userExist.length) return response(res, 400, false, `Username already exist`);

    //check email
    const emailExist = await usersModel.getUserByCondition({ email });
    if (emailExist.length) return response(res, 400, false, `Email already exist`);

    if (password !== confirmPassword) return response(res, 400, false, `Password not match`);

    //hashing password
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const inputUser = await usersModel.inputDataUser({ username, email, password: encryptedPassword });
    if (!inputUser) return response(res, 400, false, `Register failed`);

    const wallet = await walletsModel.inputAmount({ id_user: inputUser.insertId, total_amount: 100 });

    // console.log("RESPONSE OBJ", res);

    const data = {
      res: res,
      user: inputUser,
      wallet
    }

    await updateUserGameData(data);

    return response(res, 200, true, 'Register success', { id: inputUser.insertId });
  } catch (error) {
    console.log(error);
    return response(res, 500, true, 'Server error');
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return response(res, 400, false, `Field cannot be empty`);

    const emailExist = await usersModel.getUserByCondition({ email });
    if (!emailExist.length) return response(res, 400, false, `Email not found`);
    const compare = await bcrypt.compare(password, emailExist[0].password);
    if (!compare) return response(res, 400, false, `Password Wrong`);

    const data = {
      id_user: emailExist[0].id_user,
      email: emailExist[0].email,
      username: emailExist[0].username,
    }

    console.log(APP_KEY, "<<< ini appkey");
    const token = jwt.sign(data, APP_KEY);

    const getWallets = await walletsModel.getWalletUser(emailExist[0].id_user);
    if (!getWallets) return response(res, 400, false, `Login failed`);

    const getInventory = await inventoryModel.getInventory({ userId: emailExist[0].id_user })
    console.log("getInventory", getInventory);
    if (!getInventory) return response(res, 400, false, `Login failed`);

    const payload = {
      t: token,
      user_id: getInventory[0].user_id,
      total_chickens: getInventory[0].total_chickens,
      total_eggs: getInventory[0].total_eggs,
      total_feeds: getInventory[0].total_feeds,
      total_others: getInventory[0].total_others,
      wallet_id: getInventory[0].wallet_id,
      total_coins: getWallets[0].total_amount
    }

    return response(res, 200, true, 'Login Success', payload);
  } catch (error) {
    console.log(error);
    return response(res, 500, true, 'Server error');
  }
}