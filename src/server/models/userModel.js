const mongoose = require('mongoose');

const classEntry = {
  classId: { type: String },
  duration: { type: Number },
  percentWatched: { type: Number },
  played: { type: Number },
  ranges: [],
  timeTotalWatched: { type: Number },
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classEntries: [classEntry],
});

module.exports = User = mongoose.model('user', userSchema);
