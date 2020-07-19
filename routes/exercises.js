const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const Exercises = require('../model/Exercises');


// Get all
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await Exercises.find().sort({ exercise: 1 });

    res.json(exercises);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get by ID
router.get('/search/:ex_id', auth, async (req, res) => {
  try {
    const exercise = await Exercises.findById(req.params.ex_id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found in the database' });

    res.json(exercise);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Insert
router.put('/insert', [auth,
  [
    check('exercise', 'Exercise name is required').not().isEmpty()
  ],
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { exercise, body, min, max, factor } = req.body;
  try {
    let exerciseToInsert = await Exercises.findOne({ exercise });
    if (exerciseToInsert) return res.status(409).json({ errors: [{ msg: 'Exercise already exists' }] });

    exerciseToInsert = await Exercises.create({
      exercise,
      body,
      min,
      max,
      factor,
    });
    res.json(exerciseToInsert);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Edit
router.post('/edit/:ex_id', auth, async (req, res) => {
  const { exercise, body, min, max, factor } = req.body;
  try {
    let exerciseToEdit = await Exercises.find({ _id: req.params.ex_id });
    if (!exerciseToEdit) return res.status(404).json({ msg: 'Exercise not found in the database' });
    exercisesToEdit = await Exercises.findByIdAndUpdate({
      _id: req.params.ex_id,
    },
      {
        $set: {
          user: req.user.id,
          exercise,
          body,
          min,
          max,
          factor,
        },
      },
      { new: true, upsert: true });


    res.json(exerciseToEdit);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error here');
  }
});

// Remove
router.delete('/delete/:ex_id', auth, async (req, res) => {
  try {
    await Exercises.findByIdAndDelete(req.params.ex_id);

    res.json({ msg: 'Exercise removed successfully' });

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
