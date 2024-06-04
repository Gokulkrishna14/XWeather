import { useState } from "react";
import "./Main.css";
import axios from "axios";

export default function Main(){
    const[city, setCity] = useState("");
    const[loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY="035de9807a1b4c5bb0a91801242703";
    const API_ENDPOINT="https://api.weatherapi.com/v1/current.json";



    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const response = await axios.get(API_ENDPOINT, {
                params: {
                  key: API_KEY,
                  q: city
                }
            });
            console.log(response.data);
            const { temp_c, humidity, condition, wind_kph } = response.data.current;
            setWeatherData({
                temperature: `${temp_c} °C`,
                humidity: `${humidity} %`,
                condition: condition.text,
                windSpeed: `${wind_kph} kph`
            });
            setLoading(false);
        }catch(e){
            alert("Failed to fetch weather data");
            setLoading(false);
        }
        
    }

    return(
        <div className="main">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter city name" onChange={(e) => setCity(e.target.value) } />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading data…</p>}
            {weatherData && (
                <div className="weatherBox">
                    <div className="weather-card">
                        <h2>Temperature</h2>
                        <span>{weatherData.temperature}</span>
                    </div>

                    <div className="weather-card">
                        <h2>Humidity</h2>
                        <span>{weatherData.humidity}</span>
                    </div>

                    <div className="weather-card">
                        <h2>Condition</h2>
                        <span>{weatherData.condition}</span>
                    </div>

                    <div className="weather-card">
                        <h2>Wind speed</h2>
                        <span>{weatherData.windSpeed}</span>
                    </div>
                </div>
            )}
        </div>
    )
};