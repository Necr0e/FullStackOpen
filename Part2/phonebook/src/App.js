import React, {useState} from 'react'
import People from './components/People'
import Filter from './components/Filter'
import AddPerson from "./components/AddPerson";
        
const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-1234-567'},
        { name: 'Ada Lovelace', number: '39-44-5323523'},
        { name: 'Dan Abromov', number: '12-43-234345'},
        { name: 'Mary Poppendieck', number: '39-23-6423122'}
        ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ query, setQuery] = useState('')
    
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