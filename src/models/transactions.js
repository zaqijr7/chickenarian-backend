const db = require('../helpers/db');

exports.insertHistoryTransaction = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO transactions_history (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')});
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}