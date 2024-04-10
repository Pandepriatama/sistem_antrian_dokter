const express = require('express');
const router = express.Router();
const sistem_antrian_dokter = require('../services/sistem_antrian_dokter');

/* GET doctor queue. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await sistem_antrian_dokter.getDoctorQueue(req.query.page));
  } catch (err) {
    console.error(`Error while getting doctor queue `, err.message);
    next(err);
  }
});

/* POST doctor queue. */
router.post('/', async function(req, res, next) {
    try {
      res.json(await sistem_antrian_dokter.createDoctorQueue(req.body));
    } catch (err) {
      console.error(`Error while creating doctor queue`, err.message);
      next(err);
    }
  });

/* PUT doctor queue */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await sistem_antrian_dokter.updateDoctorQueue(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating doctor queue`, err.message);
      next(err);
    }
  });

/* DELETE doctor queue */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await sistem_antrian_dokter.removeDoctorQueue(req.params.id));
    } catch (err) {
      console.error(`Error while deleting doctor queue`, err.message);
      next(err);
    }
  });

/* GET doctor queue by ID */
router.get('/:id', async function(req, res, next) {
    try {
      res.json(await sistem_antrian_dokter.searchDoctorQueue(req.params.id));
    } catch (err) {
      console.error(`Error while searching doctor queue`, err.message);
      next(err);
    }
});

module.exports = router;
