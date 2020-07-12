const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email or password are missing
    if (!email || !password)
      return res.status(400).json({ msg: 'All fields are required' });

    // check if email is registered or if password is a match
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch)
      return res.status(400).json({ msg: 'Credentials are invalid' });

    // generate JWT for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
