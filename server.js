// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and other Dependencies
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Initialize Routes
// GET Route
app.get('/getData', (req, res) => {
  res.send(projectData);
  // setting project data to an empty array again so it doesn't keep the old entries
  projectData = {};
});

// POST Route
app.post('/postData', function addData(req, res) {
  (projectData['temperature'] = req.body.temperature),
    (projectData['date'] = req.body.date),
    (projectData['userResponse'] = req.body.userResponse),
    res.send(projectData);
  // console.log(`The data added is: ${res.send(projectData)}`);
});

// Setup Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
