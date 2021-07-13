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
//2.13 tehty