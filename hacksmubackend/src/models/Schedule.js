const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },  // Appointment date
  timeSlot: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  status: { type: String, enum: ['booked', 'completed', 'canceled'], default: 'booked' },
  notes: { type: String }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
