import axios from "axios";
import { useEffect, useState } from "react";

type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export default function Container() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>('Toronto');

  useEffect(() => {
    fetchWeatherData()
  }, [location]);

  const changeLocation = () => {

  };

  const fetchWeatherData = async () => {
    try {
      const weatherDataResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      setWeatherData(weatherDataResponse.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Temp: {weatherData.main.temp}</p>
          <p>Feels Like: {weatherData.main.feels_like}</p>
          <p>Temp Min: {weatherData.main.temp_min}</p>
          <p>Temp Max: {weatherData.main.temp_max}</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          {/* Add more properties as needed */}
          <p>Visibility: {weatherData.visibility}</p>
          <p>Wind Speed: {weatherData.wind.speed}</p>
          <p>Wind Degree: {weatherData.wind.deg}</p>
          <p>Wind Gust: {weatherData.wind.gust}</p>
          <p>Clouds: {weatherData.clouds.all}</p>
          <p>Timestamp: {weatherData.dt}</p>
          <p>Sunrise: {weatherData.sys.sunrise}</p>
          <p>Sunset: {weatherData.sys.sunset}</p>
          <p>Timezone: {weatherData.timezone}</p>
          <p>Location ID: {weatherData.id}</p>
          <p>Location Name: {weatherData.name}</p>
          <p>COD: {weatherData.cod}</p>
        </div>
      )}
    </div>
  );
}

