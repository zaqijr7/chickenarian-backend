const jwt = require('jsonwebtoken');
const response = require('../helpers/response');
const { APP_KEY } = process.env;

exports.authCheck = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(APP_KEY, "ini app key");
    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.substring(7);
      const data = jwt.verify(token, APP_KEY);
      console.log(data, 'result verify');
      if (data) {
        req.userData = data;
        return next();
      }
    }
    return response(res, 401, false, 'Authorization need')
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'There something wrong');
  }
}