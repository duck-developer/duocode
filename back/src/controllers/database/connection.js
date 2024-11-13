// const mysql = require('mysql2/promise')
// require('dotenv').config()
// const connection = mysql.createPool({
//     host: process.env.mySQL_HOST,
//     user: process.env.mySQL_USER,
//     password: process.env.mySQL_PASSWORD,
//     database: process.env.mySQL_DATABASE,
// })




// module.exports = connection

const mysql = require('mysql2/promise')
require('dotenv').config()


class Database {
  constructor() {
      this.pool = mysql.createPool({
          host: process.env.mySQL_HOST,
          user: process.env.mySQL_USER,
          password: process.env.mySQL_PASSWORD,
          database: process.env.mySQL_DATABASE,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
      })
  }

  async query(sql, params) {
      const [results] = await this.pool.execute(sql, params)
      return results
  }
}

module.exports = Database
