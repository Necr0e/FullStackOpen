const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "My First Blog",
        author: "Otto Seitamaa",
        url: "http://localhost:3003/api/blogs/2",
        likes: 65
    },
    {
        title: "My Second Blog",
        author: "Antti Seitamaa",
        url: "http://localhost:3003/api/blogs/3",
        likes: 69
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'will remove this'})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb, nonExistingId }