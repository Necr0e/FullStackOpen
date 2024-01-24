import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonService from './services/PersonService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    
    useEffect(() => {
        PersonService
            .getAll()
            .then((allPersons) => { setPersons(allPersons)})
            .catch((err) => alert(err))
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

    
    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you wish to delete this person?`)) {
            PersonService.remove(id).then(() => {
                setPersons(persons.filter((person) => person.id !== id))
            }).catch((err) => alert(err))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const existing_person = persons.find((person) => 
            person.name.toLowerCase() === newName.toLowerCase())

        if (existing_person) {
            alert(`${newName} is already in the phonebook!`)
            setNewName('')
            setNewNumber('')
            return
        }
        const newPerson = { name: newName, number: newNumber }
        PersonService.create(newPerson).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        })
            .catch((err) => alert(err))
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
                <Filter filter={filter} onFilterChange={handleFilterChange}/>
            <h2>Add a New</h2>
            <PersonForm 
                onFormSubmit={handleSubmit} 
                onNameChange={handleNameChange} 
                onNumberChange={handleNumberChange} 
                nameValue={newName} 
                numberValue={newNumber}
            />
            <h2>Numbers</h2>
                <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
        </div>
    )
}

export default App