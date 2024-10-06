const Doctor = require('../models/Doctor');
const User = require('../models/User');

// Fetch all doctors along with user details (name, email) and specialty
const getAllDoctors = async (req, res) => {
  try {
    // Use populate to link the doctorId (User model) and fetch specialty from Doctor model
    const doctors = await Doctor.find()
      .populate('doctorId', 'name email role')  // Fetch the linked user details
      .select('specialty location');  // Include specialty and location in the query

      const flattenedDoctors = doctors.map(doctor => ({
        userId: doctor.doctorId._id,
        doctorId: doctor._id,
        name: doctor.doctorId.name,
        email: doctor.doctorId.email,
        role: doctor.doctorId.role,
        specialty: doctor.specialty,
        location: doctor.location,  // Add this if location exists
        ratings: doctor.ratings     // Add ratings if needed
      }));
    
    res.status(200).json(flattenedDoctors);  // Send doctor info (including user details) as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Fetch specific doctor by ID with user data and specialty
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('doctorId', 'name email role')  // Fetch the linked user details
      .select('specialty location');  // Include specialty and location in the query

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);  // Send the specific doctor info as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doctor details', error });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById
};
