import React from 'react'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notifications from "./components/Notifications";
import PersonService from './services/PersonService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
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
                setSuccessMessage(`Entry deleted`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
            }).catch((err) => alert(err))
        }
    }
    const updatePerson = (id) => {
        const existing_person = persons.find(n => n.id === id)
        const updatedPerson = {...existing_person, number: newNumber}

        PersonService.update(id, updatedPerson)
            .then((returnedPerson) => {
                setPersons(persons.map((person) =>
                    person.id !== id ? person : returnedPerson))
                setSuccessMessage(`Updated ${updatedPerson.name}'s number`)
                setTimeout(() => {
                    setSuccessMessage(null)}, 5000)
                setNewName('')
                setNewNumber('')
            })
            .catch((_) => {
                setErrorMessage(`Information of ${updatedPerson.name} has already been removed from the server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter((person) => person.id !== id))
                setNewNumber('')
                setNewNumber('')
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (!newName || !newNumber) {
            alert(`Please fill in all the fields`)
            return
        }
        const existing_person = persons.find((person) => 
            person.name.toLowerCase() === newName.toLowerCase())

        if (existing_person && existing_person.number === newNumber) {
            alert(`${newName} is already in the phonebook!`)
            setNewName('')
            setNewNumber('')
            return;
        }
        if (existing_person && existing_person.number !== newNumber) {
            if (window.confirm(`${existing_person.name} is already added to the phonebook, 
            would you like to replace the old number with the new one?`)) {
               updatePerson(existing_person.id)
            }
            return;
        }
        const newPerson = { name: newName, number: newNumber }
        PersonService.create(newPerson).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setSuccessMessage(`Added ${returnedPerson.name} to the phonebook`)
            setTimeout(() => { 
                setSuccessMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
        })
            .catch((err) => alert(err))
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notifications successMessage={successMessage} errorMessage={errorMessage}/>
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