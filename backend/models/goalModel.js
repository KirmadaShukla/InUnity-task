const mongoose = require('mongoose');
const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  progress: { type: Number, default: 0 },
  deadline: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Goal', goalSchema);