const express = require('express');
const Class = require('../models/classModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // fetch all of the classes
    const classes = await Class.find();

    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/search', async (req, res) => {
  try {
    // from search input, fetch all of the matching classes
    const { search } = req.body;

    const classes = await Class.find({
      $or: [
        { title: { $regex: `${search}`, $options: 'i' } },
        { instructor: { $regex: `${search}`, $options: 'i' } },
        { level: { $regex: `${search}`, $options: 'i' } },
        { songs: { $regex: `${search}`, $options: 'i' } },
      ],
    });

    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
