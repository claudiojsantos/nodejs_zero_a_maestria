const mysql = require("mysql");

const pool = mysql.createPool({
  conectionLimit: 10,
  host: "10.211.55.4",
  user: "root",
  password: "12345678",
  database: "nodemysql",
});

module.exports = pool;
