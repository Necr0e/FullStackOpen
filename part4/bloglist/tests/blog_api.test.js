const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testMaterials = require('./test_Materials')
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = testMaterials.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('Blogs are returned properly', () => {
	test('blogs are returned as JSON', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 100000)
	test('all Blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(testMaterials.initialBlogs.length)
	})
	test('a Specific blog is returned,', async () => {
		const res = await api.get('/api/blogs')
		const title = res.body.map(titles => titles.title)
		expect(title).toContain('Second Test Blog')
	}, 100000)
})

describe('Adding new Blogs', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Testy Testerman',
			url: 'http://test.com',
			likes: 2
		}
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(testMaterials.initialBlogs.length + 1)
		const titles = blogsAtEnd.map(blogs => blogs.title)
		expect(titles).toContain('Test Blog')
	}, 100000)
	test('a blog missing the title or url will not be saved', async () => {
		const newBlog = {
			likes: 2
		}
		await api.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(testMaterials.initialBlogs.length)
	}, 100000)
	test('Adding a blog without likes will default likes to 0', async () => {
		const newBlog = {
			title: 'Are you likeless?',
			author: 'Likemaster',
			url: 'http://getliked.com'
		}
		await api.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await api.get('/api/blogs')
		const arr = blogsAtEnd.body.map(blog => {
			return { likes: blog.likes }
		})
		expect(arr[arr.length - 1].likes).toBe(0)
	})
})

describe('Viewing Blogs', () => {
	test('a specific Blog can be viewed', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToView = blogsAtStart[0]

		const result = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(result.body).toEqual(blogToView)
	},100000)
	test('Verify that all blogs have the unique identifier property is Id and its defined', async () => {
		const blogs = await api.get('/api/blogs')
		blogs.body.map(blog => {
			expect(blog.id).toBeDefined()
		})
	})
	test('Fails with a 404 error if the blog does not exist', async () => {
		const validNonExistingId = await helper.nonExistingId()
		await api
			.get(`/api/blogs/${validNonExistingId}`)
			.expect(404)
	})
	test('Fails with 400 error if id invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'
		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})
})
describe('Deleting Blogs', () => {
	test('a Blog can be deleted returns status code 204 if successful', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)
		const blogsAtEnd = await helper.blogsInDb()
		const contents = blogsAtEnd.map(content => content.title)
		expect(contents).not.toContain(blogToDelete.title)
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
	})
})
describe('Updating Blogs', () => {
	test('a Blog can be updated returns status code 204 if successful', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[1]

		const updatedBlogData = {
			likes: 69
		}

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlogData)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
		expect(updatedBlog.body.likes).toBe(69)
	})
})
afterAll(async () => {
	await mongoose.connection.close()
})

