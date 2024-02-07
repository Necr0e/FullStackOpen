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
app.get('/info', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.send(
                `<div> <p>Phonebook has info for ${persons.length} people</p> <div><p>${Date()}</p></div>`
            )
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(() => { 
            response.status(204).end()})
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
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
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true}).then(updatedPerson => {
        response.json(updatedPerson)
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})
