const usersModel = require('../models/users');
const walletsModel = require('../models/wallet');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { APP_KEY } = process.env;
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
  const { username, email, password } = req.body;

  if ( !username || !email || !password ) return response(res, 400, false, `Field cannot be empty`);
  
  const userExist = await usersModel.getUserByCondition({ username });
  if (!userExist.length) return response(res, 400, false, `User not found`);

  const emailExist = await usersModel.getUserByCondition({ email });
  if (!emailExist.length) return response(res, 400, false, `Email not found`);
  const compare = await bcrypt.compare(password, userExist[0].password);
  if (!compare) return response(res, 400, false, `Password Wrong`);

  const data = {
    id_user: emailExist[0].id_user,
    email: emailExist[0].email,
    username: emailExist[0].username,
  }

  console.log(APP_KEY, "<<< ini appkey");
  const token = jwt.sign(data, APP_KEY);
  return response(res, 200, true, 'Login Success', {t: token});

}