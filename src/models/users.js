const db = require('../helpers/db');

exports.inputDataUser = (data = {}) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
      INSERT INTO users (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')}); 
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
    console.log(q);
  })
}

exports.getUserByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM users WHERE ${Object.keys(cond)[0]}='${Object.values(cond)[0]}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}