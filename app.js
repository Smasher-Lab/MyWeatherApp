import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const apiKey = "4cb8978da64e4ed60ba489164308e922";
    const city = req.query.city || 'London';

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        res.render('index', { weather: response.data });
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.render('index', { error: "Failed to get weather data." });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});