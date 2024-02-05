const mongoose = require('mongoose')

if (process.env.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const nameInput = process.argv[3]
const numberInput = process.argv[4]

const url = `mongodb+srv://necrotto:${password}@pbcluster0.bpktnji.mongodb.net/PhoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model(`Person`, personSchema)

const person = new Person({
    name: nameInput,
    number: numberInput
})

if ((nameInput !== undefined) && (numberInput !== undefined)) {
    person.save().then(result => {
        console.log(`Added ${nameInput} with number: ${numberInput} to the phonebook.`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
    })
}