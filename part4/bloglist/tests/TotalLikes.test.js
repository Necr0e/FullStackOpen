const listHelper = require('../utils/list_helper')
const testMaterials = require('./test_Materials')

describe('Tests related to the total amount of likes', () => {
	test('Returns 0 if list is empty', () => {
		const result = listHelper.totalLikes(testMaterials.listWithoutABlog)
		expect(result).toBe(0)
	})
	test('Returns correct amount of likes when list has 1 blog.', () => {
		const result = listHelper.totalLikes(testMaterials.listWithOneBlog)
		expect(result).toBe(5)
	})
	test('Returns total number of likes in a list of multiple blogs', () => {
		const result = listHelper.totalLikes(testMaterials.listWithManyBlogs)
		expect(result).toBe(36)
	})
})