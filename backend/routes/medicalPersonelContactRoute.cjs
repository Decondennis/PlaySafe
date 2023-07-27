const express = require('express');
const router = express.Router();
const db = require('../config/db.cjs');
const MedicalPersonnelContact = require('../models/medPersonelContactModel.cjs');


router.post('/med_personel_contact', async (req, res) => {
  try {

    const { user_id, name, phone } = req.body;

    const newContact = await MedicalPersonnelContact.create({
      user_id,
      name,
      phone,
    });

    return res.status(201).json(newContact);
  } catch (error) {

    console.error('Error creating medical personnel contact entry:', error);
    return res.status(500).json({ message: 'Error creating medical personnel contact entry' });
  }
});

module.exports = router;
