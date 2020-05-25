import React, {useState} from 'react'
import Person from './components/Person'
        
const App = () => {
    const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: '040-1234-567'}])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    
    const addPerson = (event) => {
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
    return (
        <div>
            <h2>Phonebook</h2>
            
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input value={newName}
                           onChange={handleNewName}/><br/>
                    number:
                    <input value={newNumber}
                           onChange={handleNewNumber}/>
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person => <Person key={person.name} person={person}/>)}
            </div>
        </div>
    )
}

export default App