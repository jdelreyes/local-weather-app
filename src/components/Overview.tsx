import React from "react";
import UserGeolocation from "../types/UserGeolocation";
import WeatherData from "../types/WeatherData";
import ClipLoader from "react-spinners/ClipLoader";

type OverviewProps = {
  weatherData: WeatherData | null;
  userGeolocation: UserGeolocation | null;
  isLoading: boolean;
};

const Overview: React.FC<OverviewProps> = ({
  weatherData,
  userGeolocation,
  isLoading,
}) => {
  return (
    <div className="basis-3/12">
      <div className="flex flex-col items-center rounded-lg bg-gray-200 h-full p-5">
        {isLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <ClipLoader />
          </div>
        ) : (
          <>
            <h1 className="text-6xl font-extrabold my-5">
              {weatherData?.main.temp.toFixed(0)} °C
            </h1>
            <p className="text-xl font-extrabold my-5">
              {userGeolocation?.city}, {userGeolocation?.countryCode}
            </p>
            <img
              className="h-32 w-32"
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
              alt={weatherData?.weather[0].description}
            />
            <p className="text-lg text-neutral-600">
              {weatherData?.weather[0].description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
