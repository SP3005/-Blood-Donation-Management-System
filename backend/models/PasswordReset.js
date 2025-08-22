const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Expires in 1 hour
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);