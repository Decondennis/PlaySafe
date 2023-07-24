// pregnancyTrackerController.js

const express = require('express');
const router = express.Router();
const PregnancyTracker = require('../models/pregnancyTrackerModel.cjs');

// Create a new pregnancy tracker entry
router.post('/pregnancy_tracker', async (req, res) => {
  console.log('Request Body:', req.body);
  try {
    const { user_id, lmd, due_date } = req.body;
    const newTracker = await PregnancyTracker.create({ user_id, lmd, due_date });
    return res.status(201).json(newTracker);
  } catch (error) {
    console.error('Error creating pregnancy tracker entry:', error);
    return res.status(500).json({ message: 'Error creating pregnancy tracker entry' });
  }
});

// Get all pregnancy tracker entries
router.get('/pregnancy_tracker', async (req, res) => {
  try {
    const trackers = await PregnancyTracker.findAll();
    return res.status(200).json(trackers);
  } catch (error) {
    console.error('Error fetching pregnancy tracker entries:', error);
    return res.status(500).json({ message: 'Error fetching pregnancy tracker entries' });
  }
});

// Get a single pregnancy tracker entry by ID
router.get('/pregnancy_tracker/:id', async (req, res) => {
  try {
    const trackerId = req.params.id;
    const tracker = await PregnancyTracker.findByPk(trackerId);
    if (!tracker) {
      return res.status(404).json({ message: 'Pregnancy tracker entry not found' });
    }
    return res.status(200).json(tracker);
  } catch (error) {
    console.error('Error fetching pregnancy tracker entry:', error);
    return res.status(500).json({ message: 'Error fetching pregnancy tracker entry' });
  }
});

// Update a pregnancy tracker entry by ID
router.put('/pregnancy_tracker/:id', async (req, res) => {
  try {
    const trackerId = req.params.id;
    const { user_id, lmd, due_date } = req.body;
    const tracker = await PregnancyTracker.findByPk(trackerId);
    if (!tracker) {
      return res.status(404).json({ message: 'Pregnancy tracker entry not found' });
    }
    tracker.user_id = user_id;
    tracker.lmd = lmd;
    tracker.due_date = due_date;
    await tracker.save();
    return res.status(200).json(tracker);
  } catch (error) {
    console.error('Error updating pregnancy tracker entry:', error);
    return res.status(500).json({ message: 'Error updating pregnancy tracker entry' });
  }
});

// Delete a pregnancy tracker entry by ID
router.delete('/pregnancy_tracker/:id', async (req, res) => {
  try {
    const trackerId = req.params.id;
    const tracker = await PregnancyTracker.findByPk(trackerId);
    if (!tracker) {
      return res.status(404).json({ message: 'Pregnancy tracker entry not found' });
    }
    await tracker.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting pregnancy tracker entry:', error);
    return res.status(500).json({ message: 'Error deleting pregnancy tracker entry' });
  }
});

module.exports = router;
