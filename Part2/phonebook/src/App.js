import React, {useState} from 'react'
import Person from './components/Person'
        
const App = () => {
    const [ persons, setPersons ] = useState([{ name: 'Arto Hellas'}])
    const [ newName, setNewName ] = useState('')
    
    const addName = (event) => {
        event.preventDefault()
        
        const newPerson = {
            name: newName
        }
        persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) 
            ? (alert(`${newName} is already in the phone book`)) 
            : (setPersons(persons.concat(newPerson)))
        setNewName('')
    }
    const handleNewPerson = (event) => {
        
        setNewName(event.target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            
            <form onSubmit={addName}>
                <div>
                    name:
                    <input value={newName}
                           onChange={handleNewPerson}/>
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