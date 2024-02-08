const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const app = express()

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('Connected to MongoDB')
}).catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/', blogsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app;