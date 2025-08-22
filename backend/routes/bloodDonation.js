const express = require("express");
const BloodDonation = require("../models/BloodDonation");
const sendDonationStatusEmail = require("../utils/sendDonationStatusEmail");
const router = express.Router();

// Submit Blood Donation
router.post("/donate", async (req, res) => {
  try {
    const { name, age, bloodGroup, phone, email, date, message, units } = req.body;

    // Input validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Phone number must be 10 digits." });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }
    if (isNaN(age) || age < 18) {
      return res.status(400).json({ error: "Age must be 18 or older." });
    }

    // Save the donation record (optionally, your BloodDonation model can include a status field)
    const donation = new BloodDonation({ name, age, bloodGroup, phone, email, date, message, units });
    await donation.save();

    // 🔥 Update blood stock: Increase the count for the blood group
    await BloodDonation.updateOne(
      { bloodGroup },
      { $inc: { units: units || 1 } },
      { upsert: true }
    );

    res.status(201).json({ msg: "Blood donation recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Blood Stock (aggregated by blood group)
router.get("/blood-stock", async (req, res) => {
  try {
    const stock = await BloodDonation.aggregate([
      { $group: { _id: "$bloodGroup", totalUnits: { $sum: "$units" } } }
    ]);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await BloodDonation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decrease Blood Stock Units (simulate usage for a patient)
router.delete("/blood-stock/:bloodGroup", async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const latestDonation = await BloodDonation.findOne({ bloodGroup }).sort({ date: -1 });
    if (!latestDonation) {
      return res.status(404).json({ error: "Blood group not found" });
    }
    if (latestDonation.units <= 0) {
      return res.status(400).json({ error: "No available units for this blood group." });
    }
    latestDonation.units -= 1;
    if (latestDonation.units <= 0) {
      await BloodDonation.deleteOne({ _id: latestDonation._id });
    } else {
      await latestDonation.save();
    }
    const updatedStock = await BloodDonation.aggregate([
      { $group: { _id: "$bloodGroup", totalUnits: { $sum: "$units" } } }
    ]);
    res.json({ msg: "Blood unit reduced", updatedStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve a Donation (optional; if you want to have an approval process for donations)
router.put("/donations/approve/:id", async (req, res) => {
  try {
    const donation = await BloodDonation.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.json({ msg: 'Donation approved', donation });
    // ✅ Send Approved email
    await sendDonationStatusEmail(donation.email, donation.name, 'Approved');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

// Reject a Donation (optional)
router.put("/donations/reject/:id", async (req, res) => {
  try {
    const donation = await BloodDonation.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.json({ msg: 'Donation rejected', donation });
    // ✅ Send Approved email
    await sendDonationStatusEmail(donation.email, donation.name, 'Rejected'); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;