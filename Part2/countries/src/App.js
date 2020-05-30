import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Country from './components/countries.js'
import Languages from "./components/languages";


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterWith, setFilterWith] = useState('')
  const handleChange = (event) => {
    setFilterWith(event.target.value)
  }
  
  const handleFetch = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => setCountries(response.data))
  }
  
  useEffect(handleFetch, [])
  const displayResults = () => {
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(filterWith.toLowerCase()))
    if(filteredCountries.length === 1)
    {
      return <Country country={filteredCountries[0]}/>
    }
    else if(filteredCountries.length > 10)
    {
      return <div>Too many matches, please specify another filter.</div>
    }
    else
    {
      return filteredCountries.map(country => <div key={country.name}>{country.name}</div>)
    }
  }
  return (
      <div>
        <p>find countries
        <input value={filterWith}
        onChange={handleChange}/>
        </p>
        {displayResults()}
      </div>
  )
}
export default App;
