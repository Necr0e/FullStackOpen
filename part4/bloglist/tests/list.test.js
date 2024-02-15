const testHelper = require('../utils/test_Helper')
const { test, describe } = require('node:test')
const assert = require('node:assert')
const {listWithOneBlog, listWithMultipleBlogs} = require("../utils/test_Data");

test('dummy returns one', () => {
    const result = testHelper.dummy()
    assert.strictEqual(result, 1)
})

describe('test likes', () => {
    test('returns 0 for empty list', () => {
        assert.strictEqual(testHelper.totalLikes([]), 0)
    })

    test('When list has only one blog and likes should match', () => {
        const result = testHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 7)
    })
    test('Larger list should return sum of likes in the list', () => {
        const result = testHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 36)
    })
})

describe('Favorite Blog', () => {
    test('returns empty object if array is empty ', () => {
        assert.deepStrictEqual(testHelper.FavoriteBlog([]), {})
    })
    test('Returns blog with only one in list', () => {
        const result = testHelper.FavoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, { _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0})
    })
    test('Blog with most likes', () => {

        const result = testHelper.FavoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})

describe('Author with most blogs', () => {
    test('Of empty list, should be 0', () => {
        assert.deepStrictEqual(testHelper.MostBlogs([]), {})
    })
    test('When list has only one blog that equals the author', () => {
        const result = testHelper.MostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, {
            author: "Michael Chan",
            blogs: 1
        })
    })
    test('Of a bigger list is calculated correctly', () => {
        const result = testHelper.MostBlogs(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('Author with the most likes', () => {
    test('Of empty list should be 0', () => {
        assert.deepStrictEqual(testHelper.MostLikes([]), {})
    })
    test('When list has only one blog that equals the author', () => {
        const result = testHelper.MostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, {
            author:  "Michael Chan",
            likes: 7
        })
    })
    test('When list has multiple blogs and that likes are calculated correctly', () => {
        const result = testHelper.MostLikes(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})