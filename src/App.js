import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Chandigarh');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=638f054f871d4c61a0085451231911&q=${location}&aqi=no`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setLocation(e.target.value);
    }
  };

  return (
    <div className="">
      {error && <p>Error getting location: {error}</p>}
      <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6 mb-4 w-100">
          <input
            type="text"
            id="inputText"
            name="inputText"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter Location"
            onKeyPress={handleKeyPress}
          />
        </div>
        {weatherData ? (
          <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-6xl font-bold">{Math.round(weatherData?.current?.temp_c)} °C</span>
                <span className="font-semibold mt-1 text-gray-500">{weatherData?.location?.name}</span>
              </div>
              <div className="flex flex-col">
                <span><img src={weatherData?.current?.condition?.icon} alt={weatherData?.current?.condition?.text} /></span>
                <span>{weatherData?.current?.condition?.text}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col">
                Wind: {weatherData?.current?.wind_kph} kp/h
              </div>
              Humidity: {weatherData?.current?.humidity}
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                Feels Like: {weatherData?.current?.feelslike_c} °C
              </div>
              Precipitation: {weatherData?.current?.precip_mm}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;