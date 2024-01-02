import axios from "axios";
import { useEffect, useState } from "react";
// types
import WeatherData from "../types/WeatherData";
import ForecastData from "../types/ForecastData";
import UserGeolocation from "../types/UserGeolocation";
// components
import Overview from "./Overview";
import Forecast from "./Forecast";
import Details from "./Details";

export default function Container() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userGeolocation, setUserGeolocation] =
    useState<UserGeolocation | null>(null);

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      try {
        const userGeolocationDataResponse = await axios.get(
          "http://ip-api.com/json"
        );

        setUserGeolocation(userGeolocationDataResponse.data);
        setLocation(userGeolocation?.city);

        const weatherDataResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );

        setWeatherData(weatherDataResponse.data);

        const forecastDataResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${weatherDataResponse.data.coord.lat}&lon=${weatherDataResponse.data.coord.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&cnt=5`
        );

        setForecastData(forecastDataResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentWeatherData();
  }, [location, userGeolocation?.city]);

  return (
    <div className="container w-[900px] m-auto flex bg-slate-200 rounded-lg shadow-md font-sans">
      <Overview
        weatherData={weatherData}
        userGeolocation={userGeolocation}
        isLoading={isLoading}
      />
      <div className="basis-9/12 p-5 flex flex-col justify-between">
        <Forecast forecastData={forecastData} isLoading={isLoading} />
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400" />
        <Details weatherData={weatherData} isLoading={isLoading} />
      </div>
    </div>
  );
}
