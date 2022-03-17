const db = require('../helpers/db');

exports.inputAmount = (data = {}) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
      INSERT INTO wallets (${Object.keys(data).join()})
      VALUES
      (${Object.values(data).map(item => `"${item}"`).join(',')}); 
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
    console.log(q);
  })
}
