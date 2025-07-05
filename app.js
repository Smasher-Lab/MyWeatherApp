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
    const city = req.query.city || 'London';

try {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);
  const weatherData = response.data;

  res.render('index', {
    weather: weatherData,
    error: null
  });
} catch (error) {
  console.error(error);
  res.render('index', {
    weather: null,
    error: 'City not found or API error.'
  });
}
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});