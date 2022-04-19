const db = require('../helpers/db');

exports.getPetId = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM pets WHERE ${Object.keys(cond)[0]}='${Object.values(cond)[0]}'
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

exports.editPetsByCondition = (data, id) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE pets 
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id_pet = ${id}
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}