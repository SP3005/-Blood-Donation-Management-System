const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const sendBloodStatusEmail = require ('../utils/sendBloodStatusEmail');
const mongoose = require('mongoose');

// Utility to handle async errors
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Submit a new blood request (from patients)
router.post('/', asyncHandler(async (req, res) => {
  const newRequest = new BloodRequest(req.body);
  await newRequest.save();
  res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
}));

// Get all blood requests (patient requests)
router.get('/', asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find();
  res.json(requests);
}));

// Approve a blood request (admin approves a patient's request)
router.put('/approve/:id', asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid request ID' });
  }
  const request = await BloodRequest.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  res.json({ message: 'Request approved', request });
  // ✅ Send Approved email
  await sendBloodStatusEmail(request.email, request.name, 'Approved');
}));

// Reject a blood request (admin rejects a patient's request)
router.put('/reject/:id', asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid request ID' });
  }
  const request = await BloodRequest.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  res.json({ message: 'Request rejected', request });
  
  // ✅ Send rejection email
  await sendBloodStatusEmail(request.email, request.name, 'Rejected');
}));

module.exports = router;
