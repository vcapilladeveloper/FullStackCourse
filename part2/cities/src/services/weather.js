import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lon, API_KEY) => {
    const request = axios.get(`${baseUrl}/?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default { getWeather }