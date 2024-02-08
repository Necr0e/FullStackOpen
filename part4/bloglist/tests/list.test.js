const testHelper = require('../utils/test_Helper')

test('dummy returns one', () => {
    const blogs = []
    const result = testHelper.dummy(blogs)

    expect(result).toBe(1)
})

describe('Total likes', () => {
    test('returns 0 for empty list', () => {
        const blogs = []
        const result = testHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('When list has only one blog', () => {
        const blogs = [ { name: 'test', likes: 4}]
        const result = testHelper.totalLikes(blogs)
        expect(result).toBe(4)
        })
    test('Larger list should return sum of likes in the list', () => {
        const blogs = [{ name: 'test', likes: 5}, {name: 'test2', likes: 10}, {name: 'test3', likes: 50}]
        const result = testHelper.totalLikes(blogs)
        expect(result).toBe(65)
    })
})

describe('Favorite blog', () => {
    test('returns empty object if array is empty ', () => {
        const blogs = []
        const result = testHelper.FavoriteBlog(blogs)
        expect(result).toStrictEqual({})
    })
    test('Returns blog with only one in list', () => {
        const blogs = [{ title: 'test title', likes: 5}]
        const result = testHelper.FavoriteBlog(blogs)
        expect(result).toBe(blogs[0])
    })
    test('Blog with most likes', () => {
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            },
            {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
            },
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]
        const result = testHelper.FavoriteBlog(blogs)
        expect(result).toBe(blogs[2])
    })
})