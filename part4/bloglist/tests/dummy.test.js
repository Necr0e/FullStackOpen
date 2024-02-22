const listHelper = require('../utils/list_helper')
require('jest')

test('Dummy test returns 1', () => {
	const blogs = []
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})