const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();
const Clients = require('../model/Clients');
const Exercises = require('../model/Exercises');


// Get the list of all clients in the DB
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Clients.find({ user: req.user.id }).sort({ clientLastName: 1, clientFirstName: 1 }).populate('Clients', ['clientFirstName', 'clientLastName']);
    res.json(clients);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get client by id
router.get('/search/:client_id', auth, async (req, res) => {
  try {
    let client = await Clients.findById(req.params.client_id);


    if (!client)
      return res.status(404).json({ msg: 'Client not found in the database' });
    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Edit client's information
router.post('/edit/:client_id', auth, async (req, res) => {
  const {
    clientFirstName,
    clientLastName,
    clientPhone,
    clientEmail,
    clientSport,
    benchPress,
    squat,
  } = req.body;

  try {
    const newRM = { benchPress, squat };
    const client = await Clients.findByIdAndUpdate(
      {
        _id: req.params.client_id,
      },
      {
        $set: {
          user: req.user.id,
          clientFirstName,
          clientLastName,
          clientPhone,
          clientEmail,
          clientSport,
          'clientOneRM.0': newRM,
        },
      },
      { new: true, upsert: true }
    );

    if (!client) return res.status(404).json({ msg: 'Client not found in the database' });
    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Add a new RM
router.post('/add/:client_id', [auth,
  [
    check('benchPress', 'Bench Press 1RM is required').not().isEmpty(),
    check('squat', 'Squat 1RM is required').not().isEmpty(),
  ],
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const {
    benchPress,
    squat,
  } = req.body;

  const newRM = { benchPress, squat };
  try {
    const client = await Clients.findById(req.params.client_id);
    client.clientOneRM.push(newRM);
    await client.save();
    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Add notes
router.post('/notes/:client_id', auth, async (req, res) => {
  const { notes } = req.body;
  try {
    const client = await Clients.findByIdAndUpdate(
      { _id: req.params.client_id },
      { $set: { notes } },
      { new: true, upsert: true },
    );

    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Insert a client into the DB
router.put('/insert', [auth,
  [
    check('clientFirstName', 'First name is required').not().isEmpty(),
    check('clientLastName', 'Last name is required').not().isEmpty(),
    check('benchPress', 'Bench Press 1RM is required').not().isEmpty(),
    check('squat', 'Squat 1RM is required').not().isEmpty(),
  ],
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const {
      clientFirstName,
      clientLastName,
      clientPhone,
      clientEmail,
      clientSport,
      benchPress,
      squat,
    } = req.body;

    try {
      let client = await Clients.findOne({ user: req.user.id, clientFirstName, clientLastName });
      if (client) return res.status(409).json({ errors: [{ msg: 'Client already exists' }] });

      const oneRM = {
        benchPress,
        squat,
      };
      client = await Clients.create({
        user: req.user.id,
        clientFirstName,
        clientLastName,
        clientPhone,
        clientEmail,
        clientSport,
        clientOneRM: oneRM,
      });
      res.json(client);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// Delete a client
router.delete('/delete/:client_id', auth, async (req, res) => {
  try {

    await Clients.findByIdAndDelete(req.params.client_id);
    res.json({ msg: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get min - max estimates
router.post('/calculate/:client_id', auth, async (req, res) => {
  const { level } = req.body;
  try {
    // Get client by ID
    const client = await Clients.findById(req.params.client_id);
    if (!client) return res.status(404).json({ msg: 'Client not found in the database' });

    // Save RMs in seperate vars
    const benchRM = client.clientOneRM[0].benchPress;
    const squatRM = client.clientOneRM[0].squat;

    const exercisesLower = await Exercises.find({ body: "Squat" }).select({ exercise: 1, min: 1, max: 1, factor: 1 }).sort();
    const exercisesUpper = await Exercises.find({ body: "Bench" }).select({ exercise: 1, min: 1, max: 1, factor: 1 }).sort();

    const estimates = [];

    exercisesLower.map((ex) => {
      let min = Math.round(ex.min * squatRM * 100) / 100;
      let max = Math.round(ex.max * squatRM * 100) / 100;
      let { exercise } = ex;
      let { factor } = ex;
      let id = ex._id;
      estimates.push({ id, exercise, min, max, factor });
    });
    exercisesUpper.map((ex) => {
      let min = Math.round(ex.min * benchRM * 100) / 100;
      let max = Math.round(ex.max * benchRM * 100) / 100;
      let { exercise } = ex;
      let { factor } = ex;
      let id = ex._id;
      estimates.push({ id, exercise, min, max, factor });
    });

    if (level !== undefined) {
      estimates.map((ex) => {
        if (ex.factor === true && level !== undefined) {
          if (level == 0.6) {
            ex.min = Math.round(ex.min * 0.6 * 100) / 100;
            ex.max = Math.round(ex.max * 0.6 * 100) / 100;
          }
          else if (level == 0.75) {
            ex.min = Math.round(ex.min * 0.75 * 100) / 100;
            ex.max = Math.round(ex.max * 0.75 * 100) / 100;
          }
          else if (level == 0.9) {
            ex.min = Math.round(ex.min * 0.9 * 100) / 100;
            ex.max = Math.round(ex.max * 0.9 * 100) / 100;
          }
          else if (level == 1) {
            ex.min = Math.round(ex.min * 100) / 100;
            ex.max = Math.round(ex.max * 100) / 100;
          }
          else if (level == 1.1) {
            ex.min = Math.round(ex.min * 1.1 * 100) / 100;
            ex.max = Math.round(ex.max * 1.1 * 100) / 100;
          } else {
            ex.min = 0;
            ex.max = 0;
          }
        }
      });
    }
    else {
      estimates.map((ex) => {
        if (ex.factor === true) {
          ex.min = 0;
          ex.max = 0;
        }
      });
    }
    res.json(estimates);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }

});
module.exports = router;
