const _ = require('lodash')
const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length === 0 ? 0 : _.sumBy(blogs, 'likes')
}

const favoriteBlog = (blogs) => {
	return blogs.length === 0 ? 0 : _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return 0
	const numBlogs = _.countBy(blogs, 'author')
	const totals = _.map(numBlogs, (total, author) => {
		return {
			author,
			blogs: total
		}
	})
	return _.maxBy(totals, 'blogs')
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return 0
	const authors = _.groupBy(blogs, 'author')
	const likes = _.map(authors, (blogList, author) => {
		return {
			author,
			likes: _.sumBy(blogList, 'likes')
		}
	})
	return _.maxBy(likes, 'likes')
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }