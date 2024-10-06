const mongoose = require('mongoose');

const FitnessDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to student
  dailySteps: [
    {
      date: { type: Date, required: true },
      steps: { type: Number, required: true },
      distance: { type: Number }
    }
  ],
  weeklyReport: {
    startDate: Date,
    endDate: Date,
    totalSteps: Number,
    averageHeartRate: Number
  },
  monthlyReport: {
    month: String,
    totalSteps: Number,
    averageHeartRate: Number,
    activeDays: Number
  },
  goals: {
    dailyStepsGoal: Number,
    caloriesBurnedGoal: Number
  }
});

module.exports = mongoose.model('FitnessData', FitnessDataSchema);
