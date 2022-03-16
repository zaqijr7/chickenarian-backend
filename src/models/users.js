const db = require('../helpers/db');

exports.inputDataUser = () => {
  return new Promise((resolve, reject) => {

  })
}

exports.getUserByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM users WHERE ${Object.keys(cond)[0]}=${Object.values(cond)[0]}
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}