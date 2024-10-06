const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Links to User model
  specialty: { type: String, required: true },  // Doctor's area of expertise (e.g., mental health, fitness)
  
  // Availability Schema
  availability: [
    {
      day: { type: String, required: true },  // Example: "Monday", "Tuesday"
      slots: [
        {
          startTime: { type: String, required: true },  // Example: "09:00 AM"
          endTime: { type: String, required: true }     // Example: "11:00 AM"
        }
      ]
    }
  ],
  
  // Unavailability Schema (for blocking out unavailable time)
  unavailability: [
    {
      date: { type: Date, required: true },  // Specific date doctor is unavailable
      reason: { type: String },  // Optional reason (vacation, emergency, etc.)
      slots: [
        {
          startTime: { type: String, required: true },  // Example: "12:00 PM"
          endTime: { type: String, required: true }     // Example: "02:00 PM"
        }
      ]
    }
  ],

  location: {
    hospital: String,  // Hospital or clinic
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  
  // Ratings
  ratings: {
    totalRatings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
