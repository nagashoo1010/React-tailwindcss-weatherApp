import axios from 'axios'
import dayjs from 'dayjs';

import { useEffect, useState } from 'react'

export const Weather = ({ city_name, color_name }):string => {
  console.log(color_name);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const base_url = "https://api.openweathermap.org/data/2.5";
  const api_key = "9b153d1009a355b29461b493e6c5dbd6";
  const weather_icon = 'https://openweathermap.org/img/w';


  useEffect(() => {
    const getWeather = async () => {
        try {
          const response = await axios.get(`${base_url}/weather?q=${city_name},&appid=${api_key}`);
          // console.log(response.data);
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          console.log('取得に失敗しました')
        }
    }
    getWeather();
  }, [])

  // Loadingの表示。trueの場合は、下記のローディングを表示し、falseになったら天気のデータを表示する
  if (loading) {
    return <div>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        >
        </circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        >
        </path>
      </svg>
      </div>;
  }


  return (
    <div className="p-4">
      <div className={`bg-gradient-to-r from-${color_name}-500 to-${color_name}-300 w-96 h-56 m-auto rounded-xl shadow-2xl transform hover:scale-110 transition-transform text-white relative`}>
        <div className="w-full px-8 absolute top-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light">City Name</p>
              <p className="text-lg font-medium tracking-widest">{weatherData.name }</p>
            </div>
            <div>
              <img
                src={`${weather_icon}/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}/></div>
          </div>
          <div className="pt-2">
            <p className="font-light">Weather Condition</p>
            <p className="text-lg font-medium tracking-widest">{ weatherData.weather[0].main}</p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-bold tracking-more-wider text-sm">{ dayjs(weatherData.ts).format('YYYY-MM-DD')}</p>
              </div>
              <div>
                <p className="font-light text-xs">Temprature</p>
                <p className="font-bold tracking-more-wider text-sm">{weatherData.main.temp}°C</p>
              </div>
              <div>
                <p className="font-light text-xs">Humidity</p>
                <p className="font-bold tracking-more-wider text-sm">{ weatherData.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
