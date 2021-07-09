import React, { useState } from 'react'

const Numbers = ({ persons }) => {

  return (
    <>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
        )}
    </>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:  '040-123123'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

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
  

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Numbers persons={persons}/>
    </div>
  )

}

export default App
//2.8 tehty