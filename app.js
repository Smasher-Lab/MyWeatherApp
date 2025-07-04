import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const apiKey = "4cb8978da64e4ed60ba489164308e922";
    const city = req.query.city || 'London';

      if (!city) {
    // First time loading the page — no city entered
    return res.render('index', { weather: null, error: null });
  }

    try {
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