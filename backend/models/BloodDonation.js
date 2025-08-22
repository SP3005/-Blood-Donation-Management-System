const mongoose = require("mongoose");

const BloodDonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  message: String,
  units: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });


module.exports = mongoose.model("BloodDonation", BloodDonationSchema);
