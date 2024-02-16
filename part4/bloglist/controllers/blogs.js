const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
     response.json(blogs)
})
//TODO: error out on invalid id
router.get(`/:id`, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog)
    }
    else {
        response.status(404)
    }
})

router.post('/', async(request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    })
    if (body.title === undefined || body.url === undefined) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

router.delete('/:id', async (request, response ) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

router.put('/:id', async (request, response) => {
    const updatedBlog = {
        likes: request.body.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true})
    response.json(result.toJSON())

})
module.exports = router
