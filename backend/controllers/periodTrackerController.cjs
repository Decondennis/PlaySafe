// periodTrackerController.js

const express = require('express');
const router = express.Router();
const PeriodTracker = require('../models/periodTrackerModel.cjs');

// Create a new period tracker entry
router.post('/period-trackers', async (req, res) => {
  try {
    const { user_id, type, lmd, result } = req.body;
    const newTracker = await PeriodTracker.create({ user_id, type, lmd, result });
    return res.status(201).json(newTracker);
  } catch (error) {
    console.error('Error creating period tracker entry:', error);
    return res.status(500).json({ message: 'Error creating period tracker entry' });
  }
});

// Get all period tracker entries
router.get('/period-trackers', async (req, res) => {
  try {
    const trackers = await PeriodTracker.findAll();
    return res.status(200).json(trackers);
  } catch (error) {
    console.error('Error fetching period tracker entries:', error);
    return res.status(500).json({ message: 'Error fetching period tracker entries' });
  }
});

// Get a single period tracker entry by ID
router.get('/period-trackers/:id', async (req, res) => {
  try {
    const trackerId = req.params.id;
    const tracker = await PeriodTracker.findByPk(trackerId);
    if (!tracker) {
      return res.status(404).json({ message: 'Period tracker entry not found' });
    }
    return res.status(200).json(tracker);
  } catch (error) {
    console.error('Error fetching period tracker entry:', error);
    return res.status(500).json({ message: 'Error fetching period tracker entry' });
  }
});

// Update a period tracker entry by ID
router.put('/period-trackers/:id', async (req, res) => {
  try {
    const trackerId = req.params.id;
    const { user_id, type, lmd, result } = req.body;
    const tracker = await PeriodTracker.findByPk(trackerId);
    if (!tracker) {
      return res.status(404).json({ message: 'Period tracker entry not found' });
    }
    tracker.user_id = user_id;
    tracker.type = type;
    tracker.lmd = lmd;
    tracker.result = result;
    await tracker.save();
    return res.status(200).json(tracker);
  } catch (error) {
    console.error('Error updating period tracker entry:', error);
    return res.status(500).json({ message: 'Error updating period tracker entry' });
  }
});

// Delete a period tracker entry by ID
router.delete('/period-trackers/:id', async (req, res) => {
  try {
    const trackerId = req.params.id;
    const tracker = await PeriodTracker.findByPk(trackerId);
    if (!tracker) {
      return res.status(404).json({ message: 'Period tracker entry not found' });
    }
    await tracker.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting period tracker entry:', error);
    return res.status(500).json({ message: 'Error deleting period tracker entry' });
  }
});

module.exports = router;
