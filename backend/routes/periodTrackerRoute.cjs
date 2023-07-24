// backend/routes/periodTrackerRoute.js
const express = require('express');
const router = express.Router();
const db = require('../config/db.cjs'); // Import your database connection
const PeriodTracker = require('../models/periodTrackerModel.cjs');

router.post('/period-tracker', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { type, lmd, result } = req.body;

    const newRecord = await PeriodTracker.create({
        type: type,
        lmd: lmd,
        result: result,
      });
  
      // Send a response indicating successful insertion
      res.status(201).json(newRecord);
    } catch (error) {
      // Handle any errors that occurred during the insertion
      console.error('Error submitting data:', error);
      res.status(500).json({ message: 'Error submitting data' });
    }
  });

module.exports = router;
