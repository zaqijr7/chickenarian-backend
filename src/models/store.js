const db = require('../helpers/db');

exports.getItem = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM market WHERE ${Object.keys(data)[0]}='${Object.values(data)[0]}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.updateItem = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE market 
      SET total_items = total_items - ${data.totalItem}
      WHERE id_item = ${data.id_item}
      AND total_items > 0
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.getItems = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM market
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}