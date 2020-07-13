const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email or password are missing
    if (!email || !password)
      return res.status(400).json({ msg: 'All fields are required' });

    // check if email already exists
    const userExisting = await User.findOne({ email: email });
    if (userExisting)
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists' });

    // generate hashed password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save user into database
    const user = new User({
      email,
      password: passwordHash,
    });
    await user.save();

    // generate JWT for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email or password are missing
    if (!email || !password)
      return res.status(400).json({ msg: 'All fields are required' });

    // check if email is registered or if password is a match
    const user = await User.findOne({ email: email });
    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !isMatch)
      return res.status(400).json({ msg: 'Credentials are invalid' });

    // generate JWT for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenverify', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const verified = token ? jwt.verify(token, process.env.JWT_SECRET) : false;
    const user = verified ? await User.findById(verified.id) : false;

    // check if token and user are verified
    if (!token || !verified || !user) return res.json(false);

    return res.json({ id: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
