const express = require('express');
const router = express.Router();
const db = require('../config/db.cjs'); 
const PeriodTracker = require('../models/periodTrackerModel.cjs');

router.post('/period-tracker', async (req, res) => {
  try {
    
    const { type, lmd, result } = req.body;

    const newRecord = await PeriodTracker.create({
        type: type,
        lmd: lmd,
        result: result,
      });
  
      res.status(201).json(newRecord);
    } catch (error) {
     
      console.error('Error submitting data:', error);
      res.status(500).json({ message: 'Error submitting data' });
    }
  });

module.exports = router;
