const express = require('express');
const bcrypt = require('bcryptjs');
const fs =  require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
const router = express.Router();

// Register user
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password between 6 to 12 long').isLength({ min: 6, max: 12}),
], async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user =  await User.findOne({ email });

    if(!user) return res.status(400).json({ errors: [{ msg: 'No such user' }]});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid password' }]});

    const payload = { user: { id: user.id } };
    const privateKey =  fs.readFileSync(path.join(__dirname, '../jwtkeys/jwtRS256.key'), 'utf8');
    const signOptions = {
      expiresIn: '7d',
      algorithm: 'RS256',
    }

    jwt.sign(payload, privateKey, signOptions, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.send('user route');
  }
});

// Authorize user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports =  router;