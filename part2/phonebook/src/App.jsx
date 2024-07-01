import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] =useState('')

    const getData = () => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }
    useEffect(getData, [])

    const handleChange = (event) => {
        if (event.target.name === "name") {
            setNewName(event.target.value)
        } else if (event.target.name === "number") {
            setNewNumber(event.target.value)
        } else if (event.target.name === "search") {
            setSearch(event.target.value)
        }
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()
        const nameExists = (person) => person.name === newName
        if (persons.some(nameExists)) {
            alert(`${newName} is already added to the phonebook.`)
        } else if (newName === '' || newNumber === '') {
            alert(`Missing name or number.`)
        } else {
            setPersons(persons.concat({
                name: newName,
                number: newNumber
            }))
            setNewName('')
            setNewNumber('')
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Search</h3>
            <Filter search={search} onChange={handleChange} />
            <h3>add a Number</h3>
            <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} onChange={handleChange} />
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}
export default App