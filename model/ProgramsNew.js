const mongoose = require('mongoose');

const programsNewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: mongoose.Types.ObjectId,
  },
  clientName: String,
  month: String,
  year: String,
  daysPerWeek: Number,
  level: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  programs: [{
    percentages: Number,
    repsMin: Array,
    repsMax: Array,
    sets: Array,
    exerciseList: Array,
  }]
});

const ProgramsNew = mongoose.model('ProgramsNew', programsNewSchema);

module.exports = ProgramsNew;