const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const ExerciseLog = require('../model/ExerciseLog');


// Get all
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await ExerciseLog.find({ user: req.user.id }).sort({ exerciseCategory: 1, exerciseName: 1 }).populate('ExerciseLog');
    res.json(exercises);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get - paginated
router.get('/log/:page?', auth, async (req, res) => {
  try {
    const nPerPage = 10;
    const page = Math.max(0, req.query.n);

    let count = (await ExerciseLog.find({ user: req.user.id }).countDocuments()) / nPerPage;
    let exercises = await ExerciseLog.find({ user: req.user.id }).limit(nPerPage).skip(nPerPage * page).sort({ exerciseCategory: 1, exerciseName: 1 });

    res.json({ exerciseLibraryList: exercises, numPages: count });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get by Name
router.get('/search/:ex_id', auth, async (req, res) => {
  try {
    const exercise = await ExerciseLog.findById(req.params.ex_id);
    if (!exercise) return res.status(404).json({ msg: 'Exercise not found in the database' });
    res.json(exercise);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Insert
router.put('/insert', [auth, [
  check('exerciseName', 'Exercise name is required').not().isEmpty()
],
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { exerciseName, videoLink, exerciseCategory } = req.body;
  try {
    let exercise = await ExerciseLog.findOne({ exerciseName });
    if (exercise) return res.status(409).json({ errors: [{ msg: 'Exercise already exists' }] });
    exercise = await ExerciseLog.create({
      user: [req.user.id],
      exerciseName,
      videoLink,
      exerciseCategory,
    });
    res.json(exercise);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Edit
router.post('/edit/:ex_id', auth, async (req, res) => {
  const { exerciseName, videoLink, exerciseCategory } = req.body;
  try {
    let exercise = await ExerciseLog.find({ _id: req.params.ex_id });
    if (!exercise) return res.status(404).json({ msg: 'Exercise not found in the database' });
    exercise = await ExerciseLog.findByIdAndUpdate({
      _id: req.params.ex_id,
    },
      {
        $set: {
          user: req.user.id,
          exerciseName,
          videoLink,
          exerciseCategory,
        },
      },
      { new: true, upsert: true });


    res.json(exercise);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error here');
  }
});

// Remove
router.delete('/delete/:ex_id', auth, async (req, res) => {
  try {
    await ExerciseLog.findByIdAndDelete(req.params.ex_id);

    res.json({ msg: 'Exercise removed successfully' });

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;