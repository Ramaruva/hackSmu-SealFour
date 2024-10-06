const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById } = require('../controllers/doctorController');

// Route to get all doctors
router.get('/doctors', getAllDoctors);

// Route to get a doctor by ID
router.get('/doctors/:id', getDoctorById);

module.exports = router;
