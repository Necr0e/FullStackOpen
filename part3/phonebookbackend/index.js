const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (request) => 
    request.method === 'POST' && request.body.name ? 
        JSON.stringify(request.body) : null)

    let persons = [
        {
            "id": 1,
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": 4,
            "name": "Mary Poppendieck",
            "number": "34-23-6423122"
        }
    ]

app.get('/', (request, response) => {
    response.send(`<h1>Hello world!</h1>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send("<h1>ERROR(404):</h1> </br>The id you have inputted does not exist.").end()
    }
})

app.get('/info', (request, response, next) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</br> ${Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    return (Math.floor(Math.random() * (99999 - maxId) + maxId))
}

app.post('/api/persons/', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing'})
    }
    if (persons.find(person => person.name === body.name )) {
        return response.status(400).json({ error: 'name already exists in phonebook.'})
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is listening to port ${PORT}`)