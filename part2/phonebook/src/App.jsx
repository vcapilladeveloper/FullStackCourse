import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    console.log(event);
    event.preventDefault()
    const newPerson = persons.find((item) => item.name === newName)
    const person = persons.find(n => n.id === newPerson.id)
    const changedPerson = { ...person, name: newName, number: newNumber}
    if (newPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) { 
        console.log(newPerson.name);
        personsService
        .updatePerson(newPerson.id, changedPerson)
        .then(returnedPersons => {
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPersons))
          setNewName('')
          setNewNumber('')
        })
        
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`
      }
      personsService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const deletePerson = (person) => {
    console.log(`${person}`)
    if (window.confirm(`Delete ${person.name}`)) {
    personsService
        .deletePerson(person.id)
        .then(returnedPersons => {
          console.log(returnedPersons)
          setPersons(persons.filter(person => person.id != returnedPersons.id))
          setNewName('')
          setNewNumber('')
        })
      }
  }

  const hook = () => {
    console.log('effect')
    personsService
      .getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
