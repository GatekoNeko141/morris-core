const mysql = require("mysql")

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE
// })

const db = mysql.createConnection("mysql://root:jKtqlxfcW9Yr8g5Z6cUL@containers-us-west-168.railway.app:7011/railway")

db.connect(err => {
  if(err){
    throw err
  }
  console.log('MySQL Conectado!')
})

module.exports = db