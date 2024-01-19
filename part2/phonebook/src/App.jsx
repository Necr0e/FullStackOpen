import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' },
        { name: 'Otto Seitamaa'}
    ])
    
    const [newName, setNewName] = useState('')
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const addName = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }
        setPersons(persons.concat(personObject))
        setNewName('')
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
            <form onSubmit={addName}>Name: 
                <input value={newName}
                       onChange={handleNameChange}/><br></br>
                <button type="submit">Add</button>
            </form>
            </div>
            <h2>Numbers:</h2>
            <div>
                {persons.map((person) => <p key={person.name}> {person.name} </p>)}
            </div>
        </div>
    )
}
export default App
