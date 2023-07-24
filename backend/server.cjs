const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.cjs');
const app = express();
const port = 5000;
const usersController = require('./controllers/usersController.cjs');
const remainderSettingsController = require('./controllers/remainderSettingsController.cjs');
const pregnancyTrackerController = require('./controllers/pregnancyTrackerController.cjs');
const periodTrackerController = require('./controllers/periodTrackerController.cjs');
const medPersonelContactController = require('./controllers/medPersonelContactController.cjs');
const antenatalReminderController = require('./controllers/antenatalReminderController.cjs');
const periodTrackerRoute = require('./routes/periodTrackerRoute.cjs');
const pregnancyTrackerRoute = require('./routes/pregnancyTrackerRoute.cjs');
const medicalPersonelRouteRoute = require('./routes/medicalPersonelContactRoute.cjs');

app.use(express.json());
app.use(cors());

// Use the controllers for routes related to different models
app.use('/', usersController);
app.use('/', remainderSettingsController);
app.use('/', pregnancyTrackerController);
app.use('/', periodTrackerController);
app.use('/', medPersonelContactController);
app.use('/', antenatalReminderController);
app.use('/', periodTrackerRoute);
app.use('/', pregnancyTrackerRoute);
app.use('/', medicalPersonelRouteRoute);

// Sync the models with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Models synced with the database.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
})();

// ... (other routes) ...

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
