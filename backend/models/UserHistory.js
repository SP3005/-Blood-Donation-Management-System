const mongoose = require('mongoose');
require('./User');

const userHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actionType: {
    type: String,
    enum: ['DONATION', 'REQUEST'],
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: String,
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  },
});

module.exports = mongoose.model('UserHistory', userHistorySchema);
