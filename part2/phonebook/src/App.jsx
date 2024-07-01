import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const initialPersons = [
        { name: 'Arto Hellas', number: '040-1234567', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
    const [persons, setPersons] = useState(initialPersons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] =useState('')

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
