import { useState, useEffect } from 'react'
import personService from './services/persons'
import findService from './services/find'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import { Form } from './components/Form'
import { AddFilter, ShowFiltered } from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])
    const reset = () => {
        setNewName('')
        setNewNumber('')
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        if (findService.matchNumber(persons, newNumber)) {
            alertUser()
        } else if (findService.matchName(persons, newName)) {
            changeNumber()
        } else {
            savePerson()
        }
    }
    const handleDeletePerson = (personId) => {
        const name = findService.findNameWithId(personId, persons)
        if (window.confirm('Delete ' + name + ' from phonebook?')) {
            removePerson(personId)
        }
    }
    const alertUser = () => {
        const numberOwner = findService.findNameWithNumber(newNumber, persons)
        showErrorMessage(`No contact added, because the number ${newNumber} is already saved to phonebook for ${numberOwner}`)
        reset()
    }
    const changeNumber = () => {
        if (window.confirm(` ${newName} is already added to phonebook, replace the old number with a new one?`)) {
            changePerson(findService.findIdWithName(newName, persons))
        }
    }
    const changePerson = (id) => {
        const person = persons.find(n => n.id === id)
        const changedPerson = { ...person, number: newNumber }
        personService
            .update(id, changedPerson)
            .then(response => {
                setPersons(persons.map(person => person.id !== id ? person : response.data))
                showSuccessMessage(`The number ${newNumber} is added to ${newName} `)
            })
            .catch(error => {
                showErrorMessage('Sorry, something went wrong: ' + error.response.data.error)
                setPersons(persons.filter(n => n.id !== id))
            })
        reset()
    }
    const savePerson = () => {
        const personObject = {
            name: newName,
            number: newNumber,
        }
        personService
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                showSuccessMessage(`The contact with name ${newName} and number ${newNumber} is added to phonebook`)
            })
            .catch(error => {
                showErrorMessage('Sorry, something went wrong: ' + error.response.data.error)
            })
        reset()
    }
    const removePerson = (id) => {
        const name = findService.findNameWithId(id, persons)
        personService
            .deletePerson(id)
            .then(response => {
                setPersons(persons.filter(n => n.id !== id))
                showSuccessMessage(` ${name} is deleted from the phonebook `)
            })
            .catch(error => {
                showErrorMessage('Sorry, something went wrong: ' + error.response.data.error)
            })
    }
    const showSuccessMessage = (message) => {
        setSuccessMessage(message)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 3000)
    }
    const showErrorMessage = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
    }
    return (
        <div>

            <h1> Phonebook </h1>

            <ErrorNotification message={errorMessage}/>
            <SuccessNotification message={successMessage}/>

            <AddFilter
                filter={newFilter}
                onChange={handleFilterChange}
            />
            
            <h2> Add a new contact </h2>

            <Form
                onSubmit={addPerson}
                valueName={newName}
                onNameChange={handleNameChange}
                valueNumber={newNumber}
                onNumberChange={handleNumberChange}
                buttonText='ADD CONTACT'
            />
            <h2> Contacts </h2>
            <ShowFiltered
                contacts={persons}
                filter={newFilter}
                buttonFunction={handleDeletePerson}
            />
        </div>
    )
}
export default App