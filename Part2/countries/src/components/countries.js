import React from 'react'
import Languages from "./languages";

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>Languages</h2>
            <Languages items={country.languages}/>
            <img src={country.flag} style={{height: 100}} alt='flag'/>
        </div>
    )
}
export default Country