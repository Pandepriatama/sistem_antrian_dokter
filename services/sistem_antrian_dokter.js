const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getDoctorQueue(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT A.id_antrian, A.id_pasien, A.id_dokter, A.tanggal_periksa, A.status
    FROM Antrian A
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function createDoctorQueue(doctorQueue) {
  const result = await db.query(
    `INSERT INTO Antrian 
    (id_pasien, id_dokter, tanggal_periksa, status) 
    VALUES 
    (${doctorQueue.id_pasien}, ${doctorQueue.id_dokter}, '${doctorQueue.tanggal_periksa}', '${doctorQueue.status}')`
  );

  let message = 'Error in creating doctor queue';

  if (result.affectedRows) {
    message = 'Doctor queue created successfully';
  }

  return { message };
}

async function updateDoctorQueue(id, doctorQueue) {
  const result = await db.query(
    `UPDATE Antrian 
    SET id_pasien=${doctorQueue.id_pasien}, id_dokter=${doctorQueue.id_dokter}, tanggal_periksa='${doctorQueue.tanggal_periksa}', status='${doctorQueue.status}' 
    WHERE id_antrian=${id}`
  );

  let message = 'Error in updating doctor queue';

  if (result.affectedRows) {
    message = 'Doctor queue updated successfully';
  }

  return { message };
}

async function removeDoctorQueue(id) {
  const result = await db.query(
    `DELETE FROM Antrian WHERE id_antrian=${id}`
  );

  let message = 'Error in deleting doctor queue';

  if (result.affectedRows) {
    message = 'Doctor queue deleted successfully';
  }

  return { message };
}

async function searchDoctorQueue(id) {
  const rows = await db.callSpSearch(id);
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

module.exports = {
  getDoctorQueue,
  createDoctorQueue,
  updateDoctorQueue,
  removeDoctorQueue,
  searchDoctorQueue
};
