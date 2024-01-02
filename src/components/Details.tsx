import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherData from "../types/WeatherData";

type DetailsProps = {
  weatherData: WeatherData | null;
  isLoading: boolean
}

const Details: React.FC<DetailsProps> = ({weatherData, isLoading}) => {
  return (
    <div className="p-3">
      <div className="flex justify-between p-1">
        <div className="text-xl font-semibold">MAXIMUM TEMPERATURE</div>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <div className="text-neutral-600 text-xl">
            {weatherData?.main.temp_max.toFixed(0)} °C
          </div>
        )}
      </div>
      <div className="flex justify-between p-1">
        <div className="text-xl font-semibold">MINIMUM TEMPERATURE</div>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <div className="text-neutral-600 text-xl">
            {weatherData?.main.temp_min.toFixed(0)} °C
          </div>
        )}
      </div>
      <div className="flex justify-between p-1">
        <div className="text-xl font-semibold">WIND SPEED</div>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <div className="text-neutral-600 text-xl">
            {weatherData?.wind.speed.toFixed(1)} km/h
          </div>
        )}
      </div>
      <div className="flex justify-between p-1">
        <div className="text-xl font-semibold">HUMIDITY</div>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <div className="text-neutral-600 text-xl">
            {weatherData?.main.humidity} %
          </div>
        )}
      </div>
      <div className="flex justify-between p-1">
        <div className="text-xl font-semibold">AIR PRESSURE</div>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <div className="text-neutral-600 text-xl">
            {weatherData?.main.pressure} mb
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
