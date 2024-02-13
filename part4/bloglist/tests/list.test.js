const testHelper = require('../utils/test_Helper')
const {listWithOneBlog, listWithMultipleBlogs} = require("../utils/test_Data");

test('dummy returns one', () => {
    const result = testHelper.dummy()
    expect(result).toBe(1)
})

describe('test likes', () => {
    test('returns 0 for empty list', () => {
        expect(testHelper.totalLikes([])).toBe(0)
    })

    test('When list has only one blog and likes should match', () => {
        const result = testHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(7)
    })
    test('Larger list should return sum of likes in the list', () => {
        const result = testHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(36)
    })
})

describe('Favorite Blog', () => {
    test('returns empty object if array is empty ', () => {
        expect(testHelper.FavoriteBlog([])).toEqual({})
    })
    test('Returns blog with only one in list', () => {
        const result = testHelper.FavoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        })
    })
    test('Blog with most likes', () => {

        const result = testHelper.FavoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual({
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
        expect(testHelper.MostBlogs([])).toEqual({})
    })
    test('When list has only one blog that equals the author', () => {
        const result = testHelper.MostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Michael Chan",
            blogs: 1
        })
    })
    test('Of a bigger list is calculated correctly', () => {
        const result = testHelper.MostBlogs(listWithMultipleBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('Author with the most likes', () => {
    test('Of empty list should be 0', () => {
        expect(testHelper.MostLikes([])).toEqual({})
    })
    test('When list has only one blog that equals the author', () => {
        const result = testHelper.MostLikes(listWithOneBlog)
        expect(result).toEqual({
            author:  "Michael Chan",
            likes: 7
        })
    })
    test('When list has multiple blogs and that likes are calculated correctly', () => {
        const result = testHelper.MostLikes(listWithMultipleBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})