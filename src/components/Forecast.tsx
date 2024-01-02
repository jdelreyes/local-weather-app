import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ForecastData from "../types/ForecastData";

type ForecastProps = {
  forecastData: ForecastData | null;
  isLoading: boolean;
};

const Forecast: React.FC<ForecastProps> = ({forecastData, isLoading}) => {
  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <ClipLoader />
          </div>
        ) : (
          <ul className="flex justify-between">
            {forecastData?.list.map((element, index) => {
              const forecastDate = new Date();
              forecastDate.setDate(forecastDate.getDate() + index + 1);
              return (
                <li key={element.dt}>
                  <img
                    src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                    alt={element.weather[0].description}
                    width={60}
                  />
                  <div>
                    {forecastDate.toLocaleString("en-us", {
                      weekday: "long",
                    })}
                  </div>
                  <div className="text-neutral-600">
                    {element.main.temp.toFixed(0)} °C
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Forecast;
