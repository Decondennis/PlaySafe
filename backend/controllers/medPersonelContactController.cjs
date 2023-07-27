const express = require('express');
const router = express.Router();
const MedPersonelContact = require('../models/medPersonelContactModel.cjs');

router.post('/med_personel_contacts', async (req, res) => {
  try {
    const { user_id, name, phone } = req.body;
    const newContact = await MedPersonelContact.create({ user_id, name, phone });
    return res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating medical personnel contact entry:', error);
    return res.status(500).json({ message: 'Error creating medical personnel contact entry' });
  }
});

router.get('/med-personel-contacts', async (req, res) => {
  try {
    const contacts = await MedPersonelContact.findAll();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching medical personnel contact entries:', error);
    return res.status(500).json({ message: 'Error fetching medical personnel contact entries' });
  }
});

// Get a single medical personnel contact entry by ID
router.get('/med_personel_contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await MedPersonelContact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Medical personnel contact entry not found' });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching medical personnel contact entry:', error);
    return res.status(500).json({ message: 'Error fetching medical personnel contact entry' });
  }
});

// Update a medical personnel contact entry by ID
router.put('/med_personel_contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const { user_id, name, phone } = req.body;
    const contact = await MedPersonelContact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Medical personnel contact entry not found' });
    }
    contact.user_id = user_id;
    contact.name = name;
    contact.phone = phone;
    await contact.save();
    return res.status(200).json(contact);
  } catch (error) {
    console.error('Error updating medical personnel contact entry:', error);
    return res.status(500).json({ message: 'Error updating medical personnel contact entry' });
  }
});


router.delete('/med_personel_contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await MedPersonelContact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Medical personnel contact entry not found' });
    }
    await contact.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting medical personnel contact entry:', error);
    return res.status(500).json({ message: 'Error deleting medical personnel contact entry' });
  }
});

module.exports = router;
