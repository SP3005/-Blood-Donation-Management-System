// routes/userHistory.js
const express = require('express');
const router = express.Router();
const UserHistory = require('../models/UserHistory');

// Create history record
router.post('/add', async (req, res) => {
  try {
    const { userId, actionType, bloodGroup, date, location, status } = req.body;

    const newEntry = new UserHistory({
      userId,
      actionType,
      bloodGroup,
      date,
      location,
      status,
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Error adding user history' });
  }
});


// Get history by user
router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const history = await UserHistory.find({ userId }).sort({ date: -1 });
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user history' });
    }
  });
  
module.exports = router;