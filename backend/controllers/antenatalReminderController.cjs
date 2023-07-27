const express = require('express');
const router = express.Router();
const AntenatalReminder = require('../models/antenatalReminderModel.cjs');


router.post('/antenatal-reminders', async (req, res) => {
  try {
    const { user_id, appointment_date, time } = req.body;
    const newReminder = await AntenatalReminder.create({ user_id, appointment_date, time });
    return res.status(201).json(newReminder);
  } catch (error) {
    console.error('Error creating antenatal reminder entry:', error);
    return res.status(500).json({ message: 'Error creating antenatal reminder entry' });
  }
});

router.get('/antenatal-reminders', async (req, res) => {
  try {
    const reminders = await AntenatalReminder.findAll();
    return res.status(200).json(reminders);
  } catch (error) {
    console.error('Error fetching antenatal reminder entries:', error);
    return res.status(500).json({ message: 'Error fetching antenatal reminder entries' });
  }
});


router.get('/antenatal-reminders/:id', async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await AntenatalReminder.findByPk(reminderId);
    if (!reminder) {
      return res.status(404).json({ message: 'Antenatal reminder entry not found' });
    }
    return res.status(200).json(reminder);
  } catch (error) {
    console.error('Error fetching antenatal reminder entry:', error);
    return res.status(500).json({ message: 'Error fetching antenatal reminder entry' });
  }
});

router.put('/antenatal-reminders/:id', async (req, res) => {
  try {
    const reminderId = req.params.id;
    const { user_id, appointment_date, time } = req.body;
    const reminder = await AntenatalReminder.findByPk(reminderId);
    if (!reminder) {
      return res.status(404).json({ message: 'Antenatal reminder entry not found' });
    }
    reminder.user_id = user_id;
    reminder.appointment_date = appointment_date;
    reminder.time = time;
    await reminder.save();
    return res.status(200).json(reminder);
  } catch (error) {
    console.error('Error updating antenatal reminder entry:', error);
    return res.status(500).json({ message: 'Error updating antenatal reminder entry' });
  }
});


router.delete('/antenatal-reminders/:id', async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await AntenatalReminder.findByPk(reminderId);
    if (!reminder) {
      return res.status(404).json({ message: 'Antenatal reminder entry not found' });
    }
    await reminder.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting antenatal reminder entry:', error);
    return res.status(500).json({ message: 'Error deleting antenatal reminder entry' });
  }
});

module.exports = router;
