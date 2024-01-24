import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    
    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const existing_person = persons.find((person) => 
        person.name.toLowerCase() === newName.toLowerCase()
    )

    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        if (!existing_person)
            setPersons(persons.concat(nameObject))
        else {
            alert(`${newName} is already in the phonebook!`)
        }

        setNewName('')
    }
    return (
        <div>
            <h2>Phonebook</h2>
                <Filter filter={filter} onFilterChange={handleFilterChange}/>
            <h2>Add a New</h2>
            <PersonForm 
                onFormSubmit={addPerson} 
                onNameChange={handleNameChange} 
                onNumberChange={handleNumberChange} 
                nameValue={newName} 
                numberValue={newNumber}
            />
            <h2>Numbers</h2>
                <Persons persons={persons} filter={filter}/>
        </div>
    )
}

export default App