import React, {useState, useEffect} from 'react'
import axios from 'axios'
import People from './components/People'
import Filter from './components/Filter'
import AddPerson from "./components/AddPerson";
        
const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ query, setQuery] = useState('')
    
    const dataHook = () => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }
    useEffect(dataHook, [])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const newPerson = {
            name: newName,
            number: newNumber
        }
        persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) 
            ? (alert(`${newName} is already in the phone book`)) 
            : (setPersons(persons.concat(newPerson)))
        setNewName('')
    }
    const handleNewName = (event) => {
        setNewName(event.target.value)
    }
    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setQuery(event.target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            
            <div>
                filter by name:
                <Filter query={query} handleFilterChange={handleFilterChange}/>
            </div>
            <h2>Add a new contact</h2>
            <AddPerson handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
            <h2>Numbers</h2>
            <div>
                <People persons={persons} query={query}/>
            </div>
        </div>
    )
}

export default App