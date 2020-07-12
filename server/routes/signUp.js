const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.post('/', async (req, res) => {
  let { email, password } = req.body;

  // validate form submission
  if (!email || !password)
    return res.status(400).json({ msg: 'All fields are required' });

  // check if email already exists
  const userExisting = await User.findOne({ email: email });
  if (userExisting)
    return res
      .status(400)
      .json({ mg: 'An account with this email already exists' });

  // generate hashed password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // save user into database
  const userNew = new User({
    email,
    password: passwordHash,
  });

  await userNew.save();
  res.json({ mg: 'Sign up successful' });
});

module.exports = router;
