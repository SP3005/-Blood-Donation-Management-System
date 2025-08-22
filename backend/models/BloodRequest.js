const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 18 },
  bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: { type: String, required: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  units: { type: Number, required: true, min: 1 },
  location: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  message: { type: String, trim: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);
