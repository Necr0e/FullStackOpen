﻿const logger = require('./logger')
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next ) => {
	if (error.name === 'CastError') {
		return response.status(400).send({
			error: 'Malformed id'
		})
	} else if ( error.name === 'ValidationError') {
		return response.status(400).json({
			error: error.message
		})
	} else if ( error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({
			error: 'expected `username` to be unique'
		})
	} else if ( error.name === 'JsonWebTokenError') {
		return response.status(400).json({
			error: 'token missing or invalid'
		})
	} else if ( error.name === 'TokenExpiredError') {
		return response.status(400).json({
			error: 'token expired'
		})
	}
	logger.error(error.message)
	next(error)
}

module.exports = {
	unknownEndpoint,
	errorHandler
}