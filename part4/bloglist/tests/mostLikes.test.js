const listHelper = require('../utils/list_helper')
const testMaterials = require('./test_Materials')

describe('Tests related to the total amount of blogs', () => {
	test('Returns 0 if list is empty', () => {
		const result = listHelper.mostLikes(testMaterials.listWithoutABlog)
		expect(result).toBe(0)
	})
	test('Returns author with the most blogs in a list with 1 blog.', () => {
		const result = listHelper.mostLikes(testMaterials.listWithOneBlog)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})
	test('Returns author with the most blogs in a list with many blogs', () => {
		const result = listHelper.mostLikes(testMaterials.listWithManyBlogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})