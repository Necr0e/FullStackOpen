require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (request) =>
    request.method === 'POST' && request.body.name ?
        JSON.stringify(request.body) : null)

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.json(person)
        })
})

app.get('/info', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.send(
                `<div> <p>Phonebook has info for ${persons.length} people</p> <div><p>${Date()}</p></div>`
            )
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
})

app.post('/api/persons/', (request, response) => {
    const newPerson = request.body

    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({ error: 'name or number missing'})
    }
    
    const person = new Person ({
        name: newPerson.name,
        number: newPerson.number,
    })
    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})
