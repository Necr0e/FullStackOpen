const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log('connecting to ', url)

mongoose.connect(url).then(() => {
	console.log('Connected to MongoDB')
}).catch((error) => {
	console.log('Error connecting to MongoDB:', error.message)
})

const numberValidator = (number) => {
	return (/(0([1-9]{1,2})-([0-9]{7,8}))|(0([0-9]{2})-([0-9]{7,8}))/).test(number)
}

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 5,
		maxlength: 30,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		maxlength: 12,
		required: true,
		validate: numberValidator
	}
})
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)