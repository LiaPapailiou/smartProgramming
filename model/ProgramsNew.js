const mongoose = require('mongoose');

const programsNewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: mongoose.Types.ObjectId,
  },
  month: String,
  year: String,
  daysPerWeek: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  programs: [{
    percentages: Number,
    repsMin: Number,
    repsMax: Number,
    sets: Number,
    exerciseList: Array,
  }]
});

const ProgramsNew = mongoose.model('ProgramsNew', programsNewSchema);

module.exports = ProgramsNew;