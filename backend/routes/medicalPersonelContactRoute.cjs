const express = require('express');
const router = express.Router();
const db = require('../config/db.cjs');
const MedicalPersonnelContact = require('../models/medPersonelContactModel.cjs');


// Import the MedicalPersonnelContact model if you have defined it in a separate file
// const MedicalPersonnelContact = require('../models/medicalPersonnelContactModel');

// Define the route for creating a new medical personnel contact entry
router.post('/med_personel_contact', async (req, res) => {
  try {
    // Extract data from the request body
    const { user_id, name, phone } = req.body;

    // Create a new medical personnel contact entry using the MedicalPersonnelContact model
    const newContact = await MedicalPersonnelContact.create({
      user_id,
      name,
      phone,
    });

    // Return the newly created entry as the response
    return res.status(201).json(newContact);
  } catch (error) {
    // If there's an error, handle it and send an error response
    console.error('Error creating medical personnel contact entry:', error);
    return res.status(500).json({ message: 'Error creating medical personnel contact entry' });
  }
});

module.exports = router;
