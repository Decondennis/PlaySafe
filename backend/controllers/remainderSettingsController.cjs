// remainderSettingsController.js

const express = require('express');
const router = express.Router();
const remainderSettingModel = require('../models/remainderSettingModel.cjs');


// Create a new remainder setting
router.post('/remainder-settings', async (req, res) => {
  try {
    const { user_id, days_in_adv, time } = req.body;
    const newSetting = await RemainderSetting.create({ user_id, days_in_adv, time });
    return res.status(201).json(newSetting);
  } catch (error) {
    console.error('Error creating remainder setting:', error);
    return res.status(500).json({ message: 'Error creating remainder setting' });
  }
});

// Get all remainder settings
router.get('/remainder-settings', async (req, res) => {
  try {
    const settings = await RemainderSetting.findAll();
    return res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching remainder settings:', error);
    return res.status(500).json({ message: 'Error fetching remainder settings' });
  }
});

// Get a single remainder setting by ID
router.get('/remainder-settings/:id', async (req, res) => {
  try {
    const settingId = req.params.id;
    const setting = await RemainderSetting.findByPk(settingId);
    if (!setting) {
      return res.status(404).json({ message: 'Remainder setting not found' });
    }
    return res.status(200).json(setting);
  } catch (error) {
    console.error('Error fetching remainder setting:', error);
    return res.status(500).json({ message: 'Error fetching remainder setting' });
  }
});

// Update a remainder setting by ID
router.put('/remainder-settings/:id', async (req, res) => {
  try {
    const settingId = req.params.id;
    const { user_id, days_in_adv, time } = req.body;
    const setting = await RemainderSetting.findByPk(settingId);
    if (!setting) {
      return res.status(404).json({ message: 'Remainder setting not found' });
    }
    setting.user_id = user_id;
    setting.days_in_adv = days_in_adv;
    setting.time = time;
    await setting.save();
    return res.status(200).json(setting);
  } catch (error) {
    console.error('Error updating remainder setting:', error);
    return res.status(500).json({ message: 'Error updating remainder setting' });
  }
});

// Delete a remainder setting by ID
router.delete('/remainder-settings/:id', async (req, res) => {
  try {
    const settingId = req.params.id;
    const setting = await RemainderSetting.findByPk(settingId);
    if (!setting) {
      return res.status(404).json({ message: 'Remainder setting not found' });
    }
    await setting.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting remainder setting:', error);
    return res.status(500).json({ message: 'Error deleting remainder setting' });
  }
});

module.exports = router;
