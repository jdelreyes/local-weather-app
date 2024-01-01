import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// types
import WeatherData from "../types/WeatherData";
import ForecastData from "../types/ForecastData";
import UserGeolocation from "../types/UserGeolocation";

export default function Container() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userGeolocation, setUserGeolocation] = useState<UserGeolocation | null>(null);

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      try {
        const userGeolocationDataResponse = await axios.get("http://ip-api.com/json");

        setUserGeolocation(userGeolocationDataResponse.data);
        setLocation(userGeolocation?.city);

        const weatherDataResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );

        setWeatherData(weatherDataResponse.data);

        const forecastDataResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${weatherDataResponse.data.coord.lat}&lon=${weatherDataResponse.data.coord.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&cnt=5`
        )

        setForecastData(forecastDataResponse.data)

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentWeatherData();
  }, [location, userGeolocation?.city]);

  return (
    <div className="container w-[900px] m-auto flex bg-slate-200 rounded-lg shadow-md font-sans">
      <div className="basis-3/12">
        <div className="flex flex-col items-center rounded-lg bg-gray-200 h-full p-5">
          {isLoading ? <div className="flex justify-center items-center h-full w-full"><ClipLoader /></div> :
            <>
              <h1 className="text-6xl font-extrabold my-5">{weatherData?.main.temp.toFixed(0)} °C</h1>
              <p className="text-xl font-extrabold my-5">{userGeolocation?.city}, {userGeolocation?.countryCode}</p>
              <img className="h-32 w-32" src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt={weatherData?.weather[0].description} />
              <p className="text-lg text-neutral-600">{weatherData?.weather[0].description}</p>
            </>}
        </div>
      </div>
      <div className="basis-9/12 p-5 flex flex-col justify-between">
        <div>
          {isLoading ? <div className="flex justify-center items-center h-full w-full"><ClipLoader /></div> :
            <ul className="flex justify-between">
              {forecastData?.list.map((element, index) => {
                const forecastDate = new Date();
                forecastDate.setDate(forecastDate.getDate() + index + 1);
                return (
                  <li key={element.dt}>
                    <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt={element.weather[0].description} width={60} />
                    <div>{forecastDate.toLocaleString('en-us', { weekday: 'long' })}</div>
                    <div className="text-neutral-600">{element.main.temp.toFixed(0)}°C</div>
                  </li>
                );
              })}
            </ul>}
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400" />
        <div className="p-3">
          <div className="flex justify-between p-1">
            <div className="text-xl font-semibold">WIND SPEED</div>
            {isLoading ? <ClipLoader /> : <div className="text-neutral-600 text-xl">{weatherData?.wind.speed.toFixed(1)} km/h</div>}
          </div>
          <div className="flex justify-between p-1">
            <div className="text-xl font-semibold">HUMIDITY</div>
            {isLoading ? <ClipLoader /> : <div className="text-neutral-600 text-xl">{weatherData?.main.humidity} %</div>}
          </div>
          <div className="flex justify-between p-1">
            <div className="text-xl font-semibold">MAXIMUM TEMPERATURE</div>
            {isLoading ? <ClipLoader /> : <div className="text-neutral-600 text-xl">{weatherData?.main.temp_max.toFixed(0)} °C</div>}
          </div>
          <div className="flex justify-between p-1">
            <div className="text-xl font-semibold">MINIMUM TEMPERATURE</div>
            {isLoading ? <ClipLoader /> : <div className="text-neutral-600 text-xl">{weatherData?.main.temp_min.toFixed(0)} °C</div>}
          </div>
          <div className="flex justify-between p-1">
            <div className="text-xl font-semibold">AIR PRESSURE</div>{isLoading ? <ClipLoader /> : <div className="text-neutral-600 text-xl">{weatherData?.main.pressure} mb</div>}
          </div>
        </div>
      </div>

    </div>
  );
}
