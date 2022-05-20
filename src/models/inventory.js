const db = require("../helpers/db");

exports.insertPetUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO users_chickens (${Object.keys(data).join()})
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
      INSERT INTO user_items (${Object.keys(data).join()})
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
      SELECT * FROM user_items WHERE id_user='${data.id_user}' AND market_id='${data.market_id}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.updateFeedUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE user_items
      SET total_items = ${data.total_items}
      WHERE id_user = ${data.id_user} AND market_id = '${data.market_id}'
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
    });
  })
}

exports.insertToInventory = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO user_inventory (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')});`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
  })
}

exports.updateInventory = (data) => {
  console.log("UPDATE INVENTORY", data);
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE user_inventory
      SET total_chickens = ${data.total_chickens},
      total_eggs = ${data.total_eggs},
      total_feeds = ${data.total_feeds},
      total_others = ${data.total_others}
      WHERE user_id = ${data.user_id}
    `, (err, res, field) => {
      if (err) {
        console.log("EEEEEEEEEEEEEEEEE", err);
        reject(err);
      }
      resolve(res);
    });
  })
}
