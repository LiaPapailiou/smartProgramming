const mongoose = require('mongoose');

const programsNewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
  },
  month: String,
  year: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  programs: [{
    percentages: Array,
    repsMin: Array,
    repsMax: Array,
    sets: Array,
    exercises: Array,
  }]
});

const ProgramsNew = mongoose.model('ProgramsNew', programsNewSchema);

module.exports = ProgramsNew;