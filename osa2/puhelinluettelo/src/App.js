import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true) 
  const [ compare, setCompare ] = useState('') 
  

  const handleNameAdding = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    console.log()
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <div>filter shown with <input onChange={handleFilter}></input></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameAdding}/>
          number: <input value={newNumber} onChange={handleNumberAdding}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {numbersToShow.map(person =>
         <p key={person.name}>{person.name} {person.number}</p>
         )}
      </div>
    </div>
  )

}

export default App
//2.9 tehty 