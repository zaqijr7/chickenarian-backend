const usersModel = require('../models/users');
const walletsModel = require('../models/wallet');
const bcrypt = require('bcrypt');
const response = require('../helpers/response')

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) return response(res, 400, false, `Field cannot be empty`);

  try {
    //check username
    const userExist = await usersModel.getUserByCondition({ username });
    console.log(userExist.length);
    //check email
    if (userExist.length) return response(res, 400, false, `Username already exist`);
    const emailExist = await usersModel.getUserByCondition({ email });
    console.log(emailExist.length);
    if (emailExist.length) return response(res, 400, false, `Email already exist`);
    if (password !== confirmPassword) return response(res, 400, false, `Password not match`);
    //hashing password
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const inputUser = await usersModel.inputDataUser({username, email, password: encryptedPassword});
    if (inputUser.affectedRows) {
      await walletsModel.inputAmount({ id_user: inputUser.insertId, total_amount: 100 });
    }
    console.log(inputUser, '<<<<<<<<<<<<<< input user');
    res.send('oke')
  } catch (error) {
    console.log(error.message);
  }
}


exports.login = async (req, res) => {

}