const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
const auth = require('../middleware/auth');
const setTokenCookie = require('../middleware/setTokenCookie');
const randtoken = require('rand-token');
const router = express.Router();

var refreshTokens = {};
// Authenticate user and get token
router.post('/',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please enter a password between 6 to 12 long').isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid password" }] });

      const payload = { user: { id: user.id } };
      const privateKey = fs.readFileSync(
        path.join(__dirname, '../jwtkeys/jwtRS256.key'), 'utf8');
      const signOptions = {
        expiresIn: '3d',
        algorithm: 'RS256',
      };

      const token = jwt.sign(payload, privateKey, signOptions);
      const refreshToken = randtoken.uid(256);
      refreshTokens[refreshToken] = email;
      setTokenCookie(res, refreshToken);
      res.json({ token, user: user.email });

    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
);

router.post('/refresh-token', async (req, res) => {
  try {
    const refToken = req.cookies.refreshToken;
    let user;
    let token;

    if (refToken in refreshTokens) {
      user = await User.findOne({ email: refreshTokens[refToken] });
      if (!user) return res.status(404).json({ errors: [{ msg: "User Not Found" }] });
      const payload = { user: { id: user.id } };
      const privateKey = fs.readFileSync(
        path.join(__dirname, '../jwtkeys/jwtRS256.key'), 'utf8');
      const signOptions = {
        expiresIn: '3d',
        algorithm: 'RS256',
      };

      token = jwt.sign(payload, privateKey, signOptions);
      const refreshToken = randtoken.uid(256);
      refreshTokens[refreshToken] = user.email;
      setTokenCookie(res, refreshToken);
      res.json({ token, user: user.email });
    } else {
      res.status(401).json({ msg: 'Not Authorized' });
    }


  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Auth user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
