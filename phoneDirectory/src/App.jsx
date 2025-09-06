import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] =useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const nameExists = persons.some(
      person =>
        person?.name?.toLowerCase() === newName?.toLowerCase()
    );


    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber }
      personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      })
    }

  }

  const handleDeleteOf = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`The person '${person.name}' was already removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }


  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person =>
      person.name?.toLowerCase().includes(filter.toLowerCase())
    )


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <ul>
        {personsToShow
        .filter(person => person.name && person.name.trim() !== "")
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            handleDelete={() => handleDeleteOf(person.id)}
          />
      ))}
      </ul>
    </div>
  )
}

export default App