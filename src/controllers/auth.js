const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const response = require('../helpers/response')

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) return response(res, 400, false, `Field cannot be empty`);

  //check username
  try {
    const userExist = await usersModel.getUserByCondition({ username });
    console.log(userExist);
    res.send('oke')
  } catch (error) {
    console.log(error.message);
  }
} 