const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async(request, response) => {
	const body = request.body
	if (body.title === undefined || body.url === undefined ) return response.status(400).end()
	const newBlog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	})

	const savedBlog = await newBlog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	await Blog.findById(request.params.id)

	const updatedBlogData = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogData, {new: true})
	response.json(updatedBlog)
})

module.exports = blogsRouter