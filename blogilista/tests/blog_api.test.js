const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helpers')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User({ username: 'root', password: 'sekret' })
  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)
  await Blog.insertMany(helper.initialBlogs)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    expect(title).toContain('React patterns')
  })

  test('identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()

    const oneBlog = response.body[0]
    expect(oneBlog.__v).toBeUndefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      title: 'Microservices Resource Guide',
      url: 'https://martinfowler.com/microservices/',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Microservices Resource Guide',
    )
  })

  it('likes get default value if not set', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      title: 'Microservices Resource Guide',
      url: 'https://martinfowler.com/microservices/',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const created = response
      .body
      .filter(r => r.title === 'Microservices Resource Guide')

    expect(created[0].likes).toBe(0)
  })

  it('blog is not added without title', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      url: 'https://martinfowler.com/microservices/',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(helper.initialBlogs.length)
  })

  it('blog is not added without url', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      title: 'Microservices Resource Guide',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(helper.initialBlogs.length)
  })
})

describe('a blog can be deleted', () => {
  it('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(blogsAtStart.length - 1)

    const title = blogsAtEnd.map(r => r.title)
    expect(title).not.toContain(blogToDelete.title)
  })
})

describe('update a blog in bloglist', () => {
  test('succeeds with valid params', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    const { likes } = blogToModify
    blogToModify.likes += 1

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd[0]
    expect(blog.likes).toBe(likes + 1)
  })
})
