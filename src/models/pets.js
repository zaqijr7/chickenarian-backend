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
      SELECT * FROM pets WHERE is_feed_today >= '${data.dateBefore}' AND is_feed_today <= '${data.dateAfter}' 
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}