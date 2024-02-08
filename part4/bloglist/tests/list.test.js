const testHelper = require('../utils/test_Helper')
const blogs = require('../utils/test_Data')
const blog = blogs.blogList

test('dummy returns one', () => {
    const blogs = []
    const result = testHelper.dummy(blogs)

    expect(result).toBe(1)
})

describe('test likes', () => {
    test('returns 0 for empty list', () => {
        const emptyBlog = []
        const result = testHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })

    test('When list has only one blog', () => {
        const oneBlog = [ { name: 'test', likes: 4}]
        const result = testHelper.totalLikes(oneBlog)
        expect(result).toBe(4)
        })
    test('Larger list should return sum of likes in the list', () => {
        const result = testHelper.totalLikes(blog)
        expect(result).toBe(36)
    })
})

describe('Favorite Blog', () => {
    test('returns empty object if array is empty ', () => {
        const emptyBlog = []
        const result = testHelper.FavoriteBlog(emptyBlog)
        expect(result).toStrictEqual({})
    })
    test('Returns blog with only one in list', () => {
        const oneBlog = [ { title: 'test name', author: 'Test Dummy', likes: 4}]
        const result = testHelper.FavoriteBlog(oneBlog)
        expect(result).toEqual({
            title: 'test name',
            author: 'Test Dummy',
            likes: 4
        })
    })
    test('Blog with most likes', () => {

        const result = testHelper.FavoriteBlog(blog)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

describe('Most Blogs', () => {
    test('Most Blogs should be 3', () => {
        const result = testHelper.MostBlogs(blog)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('Most Likes', () => {
    test('Most likes should be 17', () => {
        const result = testHelper.MostLikes(blog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})