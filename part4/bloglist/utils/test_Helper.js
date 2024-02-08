const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes
    return blogs.reduce(reducer, 0)
}

const FavoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}
    const highestLikes = Math.max(...blogs.map(blog => blog.likes))
    const indexToReturn = blogs.findIndex(blog => blog.likes === highestLikes)
    return blogs[indexToReturn]
}

module.exports = { dummy, totalLikes, FavoriteBlog}