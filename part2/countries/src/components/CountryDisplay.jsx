import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_APP_API_KEY
const CountryDisplay = ({ result: country }) => {
    const [weather, setWeather] = useState([])
    const keys = Object.keys(country.languages)
    
    useEffect(() => {
        const params = {
            access_key: api_key,
            query: country.capital
        }
        axios.get('http://api.weatherstack.com/current', {params})
            .then(response => {
                const apiResponse = response.data
                console.log(apiResponse)
                console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
                setWeather(apiResponse)
            }).catch(error => {
                console.log(error)
        })
    }, [])
    
    if (weather.length > 0) {
        const currentWeather = weather[0].current
        return (
            <div>
                <div>
                    <h1>{country.name.common}</h1>
                    <p>{country.capital[0]}</p>
                    <p>{country.area}</p>
                    <h3>Languages</h3>
                    <ul>
                        {keys.map(keys => <li key={keys}>{country.languages[keys]}</li>)}
                    </ul>
                    <img src={country.flags.png} alt='flag' height='200' width='250'/>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {currentWeather.temperature}° Celcius</p>
                    <img src={currentWeather.weather_icons[0]} alt="Weather Icons"></img>
                    <p>Wind: {currentWeather.wind_speed} mph direction: {currentWeather.wind_dir}</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>{country.name.common}</h1>
                <p>{country.capital[0]}</p>
                <p>{country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {keys.map(keys => <li key={keys}>{country.languages[keys]}</li>)}
                </ul>
                <img src={country.flags.png} alt='flag' height='200' width='250'/>
            </div>
        </div>
        
    )
}

export default CountryDisplay