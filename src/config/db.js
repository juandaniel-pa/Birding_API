const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "bh8938.banahosting.com", // O la IP de tu servidor MySQL
  user: "eerzlgpd_brdngadmin",
  password: "iRF9WL,xvu}~",
  database: "eerzlgpd_birdinginpanama",
  connectionLimit: 10
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error de conexión a la base de datos:", err);
  } else {
    console.log("✅ Conectado a la base de datos correctamente");
    connection.release();
  }
});

module.exports = pool.promise();
