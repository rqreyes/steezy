const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String },
  instructor: { type: String },
  level: { type: String },
  songs: { type: String },
  videoUrl: { type: String },
  thumbnailSlug: { type: String },
});

module.exports = Class = mongoose.model('class', classSchema);
