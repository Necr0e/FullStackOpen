const _ = require('lodash')
const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : _.sumBy(blogs, 'likes')
}

const FavoriteBlog = (blogs) => {
    return blogs.length === 0 ? {} : _.maxBy(blogs, 'likes')
}

const MostBlogs = (blogs) => {
    if (blogs.length === 0) return {}
    const numBlogs = _.countBy(blogs, 'author')
    const totals = _.map(numBlogs, (total, author) => {
        return {
            author,
            blogs: total
        }
    })
    return _.maxBy(totals, 'blogs')
}

const MostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    const authors = _.groupBy(blogs, 'author')
    const likes = _.map(authors, (blogList, author) => {
        return {
            author,
            likes: _.sumBy(blogList, 'likes')
        }
    })
    return _.maxBy(likes, 'likes')
}

module.exports = { dummy, totalLikes, FavoriteBlog, MostBlogs, MostLikes}