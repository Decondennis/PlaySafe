// backend/routes/periodTrackerRoute.js
const express = require('express');
const router = express.Router();
const db = require('../config/db.cjs'); // Import your database connection
const PregnancyTracker = require('../models/pregnancyTrackerModel.cjs');

router.post('/pregnancy_tracker', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { user_id, lmd, due_date } = req.body;

    const newRecord = await PregnancyTracker.create({
        user_id: user_id,
        lmd: lmd,
        due_date: due_date,
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
