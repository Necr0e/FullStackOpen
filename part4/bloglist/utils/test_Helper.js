const lodash = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes
    return blogs.reduce(reducer, 0)
}

const FavoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}
    const blogLikes = blogs.map(blog => blog.likes)
    const largestIndex = blogLikes.indexOf(Math.max(...blogLikes))
    const largestInfo = blogs[largestIndex]

    return {
        title: largestInfo.title,
        author: largestInfo.author,
        likes: largestInfo.likes
    }
}

const MostBlogs = (blogs) => {
    if (blogs.length === 0) return {}
    let authors = blogs.map(blog => blog.author)
    authors = [...new Set(authors)]

    let published = new Array(authors.length).fill(0)
    blogs.map(blog => published[authors.indexOf(blog.author)] += 1)

    let index = published.indexOf(Math.max(...published))

    return {
        author: authors[index],
        blogs: published[index]
    }
}

const MostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    let authors = blogs.map(blog => blog.author)
    authors = [...new Set(authors)]

    let totalLikes = new Array(authors.length).fill(0)
    blogs.map(blog => totalLikes[authors.indexOf(blog.author)] += blog.likes)

    let index = totalLikes.indexOf(Math.max(...totalLikes))

    return {
        author: authors[index],
        likes: totalLikes[index]
    }
}

module.exports = { dummy, totalLikes, FavoriteBlog, MostBlogs, MostLikes}