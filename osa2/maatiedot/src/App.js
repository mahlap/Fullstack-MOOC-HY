import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Countries = ({ countries, compare }) => {
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
      <div>
        <h1>{countriesToMap[0].name}</h1>
            <p>capital {countriesToMap[0].capital}</p>
            <p>population {countriesToMap[0].population}</p>
          <h2>languages</h2>
            <ul>
            {countriesToMap[0].languages.map(language => 
              <li key={language.name}>{language.name}</li>)}
            </ul>
         <img alt={"flag of " + countriesToMap[0].name} width="50%" src={countriesToMap[0].flag}></img>   
      </div>
    )
  } else {
  return (
    <div>
      {countriesToMap.map(country => 
        <p key={country.name}>{country.name}</p>
        )}
    </div>
  )
  }
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
  

  return (
  <div>
    <div>find countries <input onChange={handleFilter}></input></div>
    <Countries countries={countries} compare={compare}/>
  </div>
  )
}

export default App;
