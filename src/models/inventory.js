const db = require("../helpers/db");

exports.insertPetUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO pets (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
  })
}

exports.insertFeedUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO feeds (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
  })
}

exports.getDataFeedUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM feeds WHERE id_user='${data.id_user}' AND type_of_feed='${data.type_of_feed}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.updateFeedUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE feeds
      SET total_items = total_items + ${data.total_items}
      WHERE id_user = ${data.id_user} AND type_of_feed = '${data.type_of_feed}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.getInventory = (data) => {
  console.log("DATA", data);
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user_inventory WHERE user_id=${data.userId}`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}