const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

router.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
     response.json(blogs)
})
//TODO: error out on invalid id
router.get(`/api/blogs/:id`, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog)
    }
    else {
        response.status(404)
    }
})

router.post('/api/blogs', async(request, response, next) => {
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

router.delete('/api/blogs/:id', async (request, response ) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
module.exports = router
