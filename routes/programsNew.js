const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const ProgramsNew = require('../model/ProgramsNew');
const Clients = require('../model/Clients');

// Get all
router.get('/', auth, async (req, res) => {
  try {
    const programs = await ProgramsNew.find({ user: req.user.id });
    res.json(programs);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get one
router.get('/search/:program_id', auth, async (req, res) => {
  try {
    const program = await ProgramsNew.findById(req.params.program_id);
    if (!program) return res.status(404).json({ msg: 'Program not found in the database' });

    res.json(program);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
// Insert
router.put('/insert', auth, async (req, res) => {
  const { programs, client, month, year, daysPerWeek, level } = req.body;

  try {
    let program = await ProgramsNew.findOne({
      $and: [{ month: month },
      { year: year },
      { client: client }]
    });
    if (program) return res.status(409).json({ errors: [{ msg: 'Program for that client already exists' }] });

    const clientDetails = await Clients.find({ _id: ObjectId(client) });
    const clientName = `${clientDetails[0].clientFirstName} ${clientDetails[0].clientLastName}`;

    program = await ProgramsNew.create({
      user: req.user.id,
      client: client,
      clientName: clientName,
      month,
      year,
      daysPerWeek,
      level,
      'programs': programs,
    });

    res.json(program);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete
router.delete('/delete/:program_id', auth, async (req, res) => {
  try {
    let program = await ProgramsNew.findById(req.params.program_id);
    if (!program) return res.status(404).json({ msg: 'Program not found in the database' });
    await ProgramsNew.findByIdAndDelete(req.params.program_id);
    res.json({ msg: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;