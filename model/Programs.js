const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  week: [{
    numberOfWeek: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    reps_min: {
      type: Number,

    },
    reps_max: {
      type: Number,

    },
    sets: {
      type: Number,
    },
    numberOfDay: {
      type: Number,
    },
    exercises: [{
      type: String,
      default: [],
    }]
  }],

});


const Programs = mongoose.model('Programs', programSchema);

module.exports = Programs;