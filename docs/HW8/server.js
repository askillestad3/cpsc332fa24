// server.js
require('dotenv').config({ path: './api.env' });
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT;  // Default to port 3001 if not specified in the .env
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// Serve index.html when visiting the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Weather data route
app.get('/weather', async (req, res) => {
    const { city, state } = req.query;

    if (!city || !state) {
        return res.status(400).json({ error: 'City and state are required' });
    }

    try {
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData[0]) {
            return res.status(404).json({ error: 'Location not found' });
        }

        const { lat, lon } = geoData[0];

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        const result = {
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            wind_speed: weatherData.wind.speed,
            condition: weatherData.weather[0].main.toLowerCase(),
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});