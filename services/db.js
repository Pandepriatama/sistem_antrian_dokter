const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

async function callSpSearch(id) {
    const connection = await db.getConnection(); // Menggunakan koneksi dari pool
    try {
      const [results] = await connection.query('CALL sp_search_doctor_queue_by_id(?)', [id]);
      return results[0]; // Mengembalikan hasil dari prosedur penyimpanan
    } finally {
      connection.release(); // Melepaskan koneksi kembali ke pool setelah digunakan
    }
  }

module.exports = {
  query,
  callSpSearch
}