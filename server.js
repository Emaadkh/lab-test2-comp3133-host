const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/launches', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/launches');
    const launches = response.data;
    res.json(launches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/launches/:flight_number', async (req, res) => {
  try {
    const flightNumber = req.params.flight_number;
    const response = await axios.get(`https://api.spacexdata.com/v3/launches/${flightNumber}`);
    const launch = response.data;
    res.json(launch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
