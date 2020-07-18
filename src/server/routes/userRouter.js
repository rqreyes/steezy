const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // if email or password are missing, then send an error
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // if email already exists, then send an error
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res
        .status(400)
        .json({ message: 'An account with this email already exists' });
    }

    // generate hashed password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // store user into database
    const user = new User({
      email,
      password: passwordHash,
    });
    await user.save();

    // generate JWT for user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // if email or password are missing, then send an error
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // if email is registered or if password is a match, then send an error
    const user = await User.findOne({ email });
    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !isMatch) {
      return res.status(400).json({ message: 'Credentials are invalid' });
    }

    // generate JWT for user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      userId: user._id,
      classEntries: user.classEntries,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenverify', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const verified = token ? jwt.verify(token, process.env.JWT_SECRET) : false;
    const user = verified ? await User.findById(verified.userId) : false;

    // if token and user are not verified, then don't send the user information
    if (!token || !verified || !user) return res.json(false);

    return res.json({ userId: user._id, classEntries: user.classEntries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { userId, classEntries } = req.body;
    const user = await User.findById(userId);

    // store new merged time ranges into database
    user.classEntries = classEntries;
    await user.save();

    res.send('Updated user successful');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
