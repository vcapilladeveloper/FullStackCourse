import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)

  const showMessage = (name, isError) => {
    setNotificationMessage(isError ? `${name}` : `Added ${name}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    console.log(isError);
    
    setErrorMessage(isError)
  }

  const addName = (event) => {
    console.log(event);
    event.preventDefault()
    const newPerson = persons.find((item) => item.name === newName)
    console.log({ newPerson });
    if (newPerson) {
      const person = persons.find(n => n.id === newPerson.id)
      const changedPerson = { ...person, name: newName, number: newNumber }
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(newPerson.name);
        PersonsService
          .updatePerson(newPerson.id, changedPerson)
          .then(returnedPersons => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPersons))
            showMessage(`${newName}`, false)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showMessage(`${newName}`, true)
          })

      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: `${persons.at(-1).id + 1}`
      }
      PersonsService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          showMessage(`${personObject.name}`, false)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          showMessage(`${error.response.data.error}`, true)
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
      PersonsService
        .deletePerson(person.id)
        .then(returnedPersons => {
          console.log(returnedPersons)
          setPersons(persons.filter(p => p.id != person.id))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const hook = () => {
    console.log('effect')
    PersonsService
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
      <Notification message={notificationMessage} isError={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
