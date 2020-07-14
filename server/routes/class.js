const express = require('express');
const router = express.Router();
const Class = require('../models/classModel');

router.get('/', async (req, res) => {
  try {
    // fetch all of the classes
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
