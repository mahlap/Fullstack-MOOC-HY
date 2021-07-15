import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ( {handleFilter} ) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter}></input>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}> 
        <div>
          name: <input value={props.newName} onChange={props.handleNameAdding}/>
          number: <input value={props.newNumber} onChange={props.handleNumberAdding}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ( {numbersToShow} ) => {
  return (
    <div>
      {numbersToShow.map(person =>
         <p key={person.name}>{person.name} {person.number}</p>
         )}
    </div>
  )
}

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true) 
  const [ compare, setCompare ] = useState('') 
  
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameAdding = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
      name: newName,
      number: newNumber
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

  }
  }

  const handleNumberAdding = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setCompare(event.target.value)
    if(event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const numbersToShow = showAll
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(compare.toUpperCase())) //does a better method exist?

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameAdding={handleNameAdding} newNumber={newNumber} handleNumberAdding={handleNumberAdding}/>
      <h3>Numbers</h3>
        <Persons numbersToShow={numbersToShow}/>
    </div>
  )

}

export default App
//2.16 tehty