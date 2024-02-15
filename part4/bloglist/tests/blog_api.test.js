const mongoose = require('mongoose')
const supertest = require('supertest')
const { it, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_Api_Helper')



beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Basic blog function tests', () => {
    it('Are returned as json', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    it('All blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    it('A specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs/')
        const contents = response.body.map(res => res.title)

        assert(contents.includes('My Second Blog'))
    })
    it('Unique identifier is Id', async () => {
        const blogsInDb = await helper.blogsInDb()
        assert.notStrictEqual(blogsInDb[0].id, undefined)
    })
})

describe('Blog manipulation', () => {
    it('A Blog cannot be added without content', async () => {
        const invalidBlog = {
            likes: 50
        }
        const blogsInDb = await helper.blogsInDb()

        await api.post('/api/blogs')
            .send(invalidBlog)
            .expect(400)

        assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
    })
    it('A blog post can be posted', async () => {
        const newBlog = {
            title: "Test Blog",
            author: "Test Dummy",
            url: "http://localhost:3003/testblog",
            likes: 52
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsInDb = await helper.blogsInDb()
        assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

        const contents = blogsInDb.map(n => n.title)
        assert(contents.includes('Test Blog'))
    })
    it('A blog post can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const showBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(showBlog.body, blogToView)
    })
    it('A blog post can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.map(r => r.title)
        assert(!contents.includes(blogToDelete.title))
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    after(async () => {
        await mongoose.connection.close()
        })
    })



