const listHelper = require('../utils/list_helper')
const testMaterials = require('./test_Materials')

describe('Tests related to the total amount of likes', () => {
	test('Returns 0 if list is empty', () => {
		const result = listHelper.favoriteBlog(testMaterials.listWithoutABlog)
		expect(result).toBe(0)
	})
	test('Returns blog with the highest likes when list has 1 blog.', () => {
		const result = listHelper.favoriteBlog(testMaterials.listWithOneBlog)
		expect(result).toEqual({
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 5,
		})
	})
	test('Returns blog with the highest likes in a list of multiple blogs', () => {
		const result = listHelper.favoriteBlog(testMaterials.listWithManyBlogs)
		expect(result).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			id: '5a422b3a1b54a676234d17f9'
		})
	})
})