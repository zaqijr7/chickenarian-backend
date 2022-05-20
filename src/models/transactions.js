const db = require('../helpers/db');

exports.insertTransactions = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO transactions (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')});
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
  })
}

exports.insertTransactionDetail = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO transaction_details (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')});
      `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.selectLastTransaction = () => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT max(transaction_id) FROM transactions`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

