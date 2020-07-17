/* eslint no-underscore-dangle: 0 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email or password are missing
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // check if email already exists
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res
        .status(400)
        .json({ message: 'An account with this email already exists' });
    }

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

    // check if email or password are missing
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // check if email is registered or if password is a match
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
      user: {
        token,
        userId: user._id,
        classEntries: user.classEntries,
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
    const user = verified ? await User.findById(verified.userId) : false;

    // check if token and user are verified
    if (!token || !verified || !user) return res.json(false);

    return res.json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const {
      userId,
      classId,
      duration,
      percentWatched,
      played,
      ranges,
      timeTotalWatched,
    } = req.body;
    const user = await User.findById(userId);

    // check if class already exists
    if (user.classEntries.find((entry) => (entry.classId = classId))) {
      const classEntry = user.classEntries.find(
        (entry) => (entry.classId = classId)
      );

      classEntry.percentWatched = percentWatched;
      classEntry.played = played;
      classEntry.ranges.push(ranges);
      classEntry.timeTotalWatched += timeTotalWatched;
    } else {
      const newEntry = {};

      newEntry.classId = classId;
      newEntry.duration = duration;
      newEntry.percentWatched = percentWatched;
      newEntry.played = played;
      newEntry.ranges = ranges;
      newEntry.timeTotalWatched = timeTotalWatched;

      user.classEntries.push(newEntry);
    }

    await user.save();

    res.send('Updated user successful');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
