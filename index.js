const axios = require('axios');
const apiKey = 'YourAPiKeyHere';
// Function for AWS Lambda
exports.handler = async (event, context) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=YourZipCodeHere,YourCountryHere&appid=${apiKey}`);
    const weatherData = response.data;

    // Check if it's cloudy
    const isCloudy = weatherData.weather.some(condition => condition.main === 'Clouds');

    return {
      statusCode: 200,
      body: `Is it Cloudy? ${isCloudy ? 'Yes' : 'No'}`,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      statusCode: 500,
      body: 'An error occurred',
    };
  }
};

// Express.js server
const express = require('express');
const app = express();
const port = 5000;

app.get('/', async (req, res) => {
  try {
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=48230,US&appid=${apiKey}`);
    const weatherData = response.data;

    // Check if it's cloudy
    const isCloudy = weatherData.weather.some(condition => condition.main === 'Clouds');

    res.send(`Is it Cloudy? ${isCloudy ? 'Yes' : 'No'}`);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Weather app listening at http://localhost:${port}`);
});

