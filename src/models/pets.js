const db = require('../helpers/db');

exports.getPetId = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM users WHERE ${Object.keys(cond)[0]}='${Object.values(cond)[0]}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.getAllPets = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM users_chickens WHERE last_feed >= '${data.dateBefore}' AND last_feed <= '${data.dateAfter}' 
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}