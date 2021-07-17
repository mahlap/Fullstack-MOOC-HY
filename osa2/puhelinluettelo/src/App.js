import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
      </div>
  )
}
const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
      </div>
  )
}

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

const Persons = ( {numbersToShow, handleDelete} ) => {
  return (
    <div>
      {numbersToShow.map(person =>
         <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.name, person.id)}>delete</button></p>
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
  const [ successMessage, setSuccessMessage ] = useState(null) 
  const [ errorMessage, setErrorMessage ] = useState(null) 
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
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook`)) {
        let updatePerson = persons.find(person => person.name === newName)
        let copy = [...persons]
        let index = copy.indexOf(updatePerson)
        copy[index] = {name: newName, number: newNumber, id: updatePerson.id}
        axios
          .put(`http://localhost:3001/persons/${updatePerson.id}`, personObject)
          .then(() => { 
          setNewName('')
          setNewNumber('')
          setPersons(copy)
          setSuccessMessage(
          `Updated ${newName}`
        )
          setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)})
        .catch(error => {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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

  const handleDelete = (name, id) => {
    if(window.confirm("Delete " + name + "?")) {
      const deletePerson = persons.find(person => person.name === name)
        let copy = [...persons]
        let index = copy.indexOf(deletePerson)
        copy.splice(index, 1)
        setPersons(copy)
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setSuccessMessage(
          `Deleted ${name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `You have already deleted ${name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameAdding={handleNameAdding} newNumber={newNumber} handleNumberAdding={handleNumberAdding}/>
      <h3>Numbers</h3>
        <Persons numbersToShow={numbersToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App