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


exports.getWalletUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM wallets WHERE id_user='${data}'
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

exports.updateWallet = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE wallets
      SET total_amount = GREATEST(0, total_amount - ${data.costBuy})
      WHERE id_user = ${data.id_user}    
    `, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}