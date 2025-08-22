// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const BloodDonation = require('../models/BloodDonation');
const BloodRequest = require('../models/BloodRequest');

// GET /api/dashboard/stats
// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
    try {
      // Exclude donations with 0 units
      const stockAggregation = await BloodDonation.aggregate([
        { $match: { units: { $gt: 0 } } }, // Only include donations with units greater than 0
        { $group: { _id: null, totalUnits: { $sum: "$units" } } }
      ]);
      const totalBloodStock = stockAggregation[0] ? stockAggregation[0].totalUnits : 0;
  
      // Count donation records excluding those with 0 units
      const donationRequests = await BloodDonation.countDocuments({ units: { $gt: 0 } });
  
      // Count blood requests and further break down by status
      const allRequests = await BloodRequest.countDocuments();
      const pendingRequests = await BloodRequest.countDocuments({ status: "Pending" });
      const approvedRequests = await BloodRequest.countDocuments({ status: "Approved" });
  
      res.json({
        totalBloodStock,
        donationRequests,
        pendingRequests,
        approvedRequests,
        allRequests,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// GET /api/dashboard/recent-activities
// GET /api/dashboard/recent-activities
router.get('/recent-activities', async (req, res) => {
    try {
      // Get recent donations (last 5) excluding those with 0 units
      const recentDonations = await BloodDonation.find({ units: { $gt: 0 } })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
  
      // Get recent blood requests (last 5)
      const recentRequests = await BloodRequest.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
  
      // Map them into a common format
      const donationActivities = recentDonations.map(donation => ({
        id: donation._id,
        action: `Donor ${donation.name} donated ${donation.units} unit(s) of ${donation.bloodGroup}`,
        time: donation.createdAt,
      }));
  
      const requestActivities = recentRequests.map(request => ({
        id: request._id,
        action: `Patient ${request.name} requested blood (${request.bloodGroup})`,
        time: request.createdAt,
      }));
  
      // Combine and sort all activities by time (descending)
      const activities = [...donationActivities, ...requestActivities].sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      );
  
      // Return the top 10 recent activities
      res.json(activities.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
