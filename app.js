import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const city = req.query.city || 'Delhi'; // Default city if none provided

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentUrl),
      axios.get(forecastUrl)
    ]);

    const weathertype = currentRes.data.weather[0].main;

    res.render('index', {
      weather: currentRes.data,
      forecast: forecastRes.data.list.slice(0, 5),
      weathertype: currentRes.data.weather[0].main,

      error: null
    });
  } catch (error) {
    console.error(error);
    res.render('index', {
      weather: null,
      forecast: null,
      weathertype: null,
      error: 'Could not fetch forecast or city not found.'
    });
  }
});

app.get('/weather', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.render('index', {
      weather: null,
      forecast: null,
      weathertype: null,
      error: 'Coordinates missing.'
    });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const forecastResponse = await axios.get(forecastUrl);

    const weatherData = response.data;
    const weathertype = weatherData.weather[0].main;

    res.render('index', {
      weather: weatherData,
      forecast: forecastResponse.data.list.slice(0, 5),
      weathertype,
      error: null
    });
  } catch (error) {
    console.error(error);
    res.render('index', {
      weather: null,
      forecast: null,
      weathertype: null,
      error: 'City not found or API error.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
