﻿const Blog = require('../models/blog')

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'this-will-be-removed-soon',
		author: 'author-will-be-removed-soon',
		url: 'url-will-be-removed-soon',
		likes: 5
	})
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = { nonExistingId, blogsInDb }