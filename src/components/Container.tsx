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

type ForecastData = {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
};

export default function Container() {
  //////////////// HOOKS ////////////////
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<string>('Toronto');

  useEffect(() => {
    fetchCurrentWeatherData()
  }, [location]);

  //////////////// FUNCTIONS ////////////////
  const fetchCurrentWeatherData = async () => {
    try {
      const weatherDataResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );

      setWeatherData(weatherDataResponse.data);

      try {
        const forecastDataResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${weatherDataResponse.data.coord.lat}&lon=${weatherDataResponse.data.coord.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&cnt=5`
        )

        setForecastData(forecastDataResponse.data)
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = event.target.value;
    setLocation(newLocation);
  };

  return (
    <div className="container w-[900px] h-[450px] m-auto flex bg-slate-200 rounded-lg shadow-md">
      <div className="basis-1/4">
        <div className="rounded-lg bg-gray-200 h-full p-5">
          <div>
            <select value={location} onChange={handleLocationChange}>
              <option value="default" disabled>Select a location</option>
              <option value="Toronto">Toronto</option>
              <option value="London">London</option>
              <option value="New York">New York</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <p className="text-2xl font-bold my-5">{new Date().toLocaleString('en-us', { weekday: 'long' })}</p>
          <p>{new Date().toDateString()}</p>
          <p>{weatherData?.name} {weatherData?.sys.country}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt={weatherData?.weather[0].description} />
          <p className="text-5xl my-5">{weatherData?.main.temp} °C</p>
          <p>{weatherData?.weather[0].description}</p>
        </div>
      </div>
      <div className="basis-3/4 p-5 flex flex-col justify-between">
        <div>
          <ul className="flex justify-between">
            {forecastData?.list.map((element, index) => {
              // Calculate the date for the current forecast item
              const forecastDate = new Date();
              forecastDate.setDate(forecastDate.getDate() + index + 1);

              return (
                <li key={element.dt}>
                  <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt={element.weather[0].description} width={60} />
                  <div>{forecastDate.toLocaleString('en-us', { weekday: 'long' })}</div>
                  <div className="font-bold">{element.main.temp}°C</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-3">
          <div className="flex justify-between p-1">
            <div className="font-bold text-lg">WIND</div><div className="text-sm">{weatherData?.wind.speed} km/h</div>
          </div>
          <div className="flex justify-between p-1">
            <div className="font-bold text-lg">HUMIDITY</div><div className="text-sm">{weatherData?.main.humidity} %</div>
          </div>
          <div className="flex justify-between p-1">
            <div className="font-bold text-lg">MAX TEMP</div><div className="text-sm">{weatherData?.main.temp_max} °C</div>
          </div>
          <div className="flex justify-between p-1">
            <div className="font-bold text-lg">MIN TEMP</div><div className="text-sm">{weatherData?.main.temp_min} °C</div>
          </div>
          <div className="flex justify-between p-1">
            <div className="font-bold text-lg">AIR PRESSURE</div><div className="text-sm">{weatherData?.main.pressure} mb</div>
          </div>
        </div>
      </div>

    </div>
  );
}

type SearchBarProps = {
  handleSubmit: (location: string) => void;
  location: string;
}