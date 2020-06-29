const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();
const Clients = require('../model/Clients');
const User = require('../model/User');

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
    const client = await Clients.findById(req.params.client_id);
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
    client = await Clients.findByIdAndUpdate(
      { _id: req.params.client_id },
      {
        $set: {
          user: req.user.id,
          clientFirstName,
          clientLastName,
          clientPhone,
          clientEmail,
          clientSport,
          clientOneRM: newRM,
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
    client.clientOneRM.unshift(newRM);
    await client.save();
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

      const clientFields = {};
      clientFields.user = req.user.id;
      clientFields.clientFirstName = clientFirstName;
      clientFields.clientLastName = clientLastName;
      if (clientEmail) clientFields.clientEmail = clientEmail;
      if (clientPhone) clientFields.clientPhone = clientPhone;
      if (clientSport) clientFields.clientSport = clientSport;
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

module.exports = router;
