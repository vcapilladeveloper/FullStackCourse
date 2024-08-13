import WeatherService from '../services/weather'
import { useState, useEffect } from 'react'
const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
  
    const languages = Object.values(country.languages)
    const flagUrl = country.flags.png
    const capital = country.capital[0]
  
    useEffect(() => {
      const apiKey = import.meta.env.VITE_API_KEY;
      console.log("Api Key", apiKey)
      const lat = country.capitalInfo.latlng[0]
      const lon = country.capitalInfo.latlng[1]
      WeatherService
        .getWeather(lat, lon, apiKey)
        .then(data => {
          setWeather(data)
        })
    }, [])
    if (!weather) {
      return null
    }
    const icon = weather.weather[0].icon
    const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>population {country.population}</p>
        <p>capital {capital}</p>
        <h4>languages</h4>
        <ul>
          {
            languages.map(language =>
              <li key={language} > {language} </li>
            )
          }
        </ul>
        <img src={flagUrl} width='200' />
        <h4>Weather in {capital} </h4>
        <p> temperature {weather.main.temp} Celsius </p>
        <img src={weatherIconUrl} width='80' />
        <p>wind {weather.wind.speed} m / s </p>
      </div>
    )
  }

  export default Country