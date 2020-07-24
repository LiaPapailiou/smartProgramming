const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  exerciseName: {
    type: 'String',
    required: true
  },
  videoLink: [
    {
      type: String,
    }
  ],
  exerciseCategory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ExerciseLog = mongoose.model('ExerciseLog', exerciseLogSchema);

module.exports = ExerciseLog;