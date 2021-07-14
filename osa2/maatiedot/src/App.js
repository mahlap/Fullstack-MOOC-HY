import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Countries = ({ countries, compare, handleClick }) => {
  let countriesToMap = countries.filter(country => country.name.toUpperCase().includes(compare.toUpperCase()))
  if(compare.length === 0) {
    return (
      <>
      </>
    )
  } else if(countriesToMap.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countriesToMap.length === 1) {
    return (
      <Country country={countriesToMap[0]} />
    )
  } else {
  return (
    <div>
      {countriesToMap.map(country => 
        <p key={country.name}>{country.name} <button onClick={() => handleClick(country.name)}>show</button></p>
        )}
    </div>
  )
  }
}

const Country = ({ country }) => {
  return (
    <div>
        <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
          <h2>languages</h2>
            <ul>
            {country.languages.map(language => 
              <li key={language.name}>{language.name}</li>)}
            </ul>
         <img alt={"flag of " + country.name} width="50%" src={country.flag}></img>
        <Weather capital={country.capital} />   
      </div>
  )
}

const Weather = ({ capital }) => {
  const [ temperature, setTemperature ] = useState('')
  const [ wind, setWind ] = useState('')
  const [ coordinates, setCoordinates ] = useState('')

  const hook = () => {
  axios
    .get(`https://nominatim.openstreetmap.org/search?q=${capital}&format=geocodejson`) //I had to do this this way - I used too many API calls when I tested with a single API
    .then(response => {
      setCoordinates(response.data.features[0].geometry.coordinates)
    })

  axios
    .get(`https://www.7timer.info/bin/astro.php?lon=${coordinates[0]}&lat=${coordinates[1]}ac=0&unit=metric&output=json&tzshift=0}`)
    .then(response => {
      setTemperature(response.data.dataseries[0].temp2m)
      setWind(response.data.dataseries[0].wind10m)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Weather in {capital}</h2>
        <p><strong>temperature: {temperature} °C</strong></p>
        <p><strong>wind: {wind.speed} direction {wind.direction}</strong></p>
    </div>
  )
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ compare, setCompare ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    setCompare(event.target.value)
  }

  const handleClick = (country) => {
    setCompare(country)
  }
  

  return (
  <div>
    <div>find countries <input onChange={handleFilter}></input></div>
    <Countries countries={countries} compare={compare} handleClick ={handleClick}/>
  </div>
  )
}

export default App;
//2.14 tehty