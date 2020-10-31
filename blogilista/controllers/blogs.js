const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (_request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

router.post('/', async (request, response) => {
  const { body, token } = request

  const decodedToken = jwt
    .verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    response
      .status(401)
      .json({ error: 'Invalid authentication' })
      .end()
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog._id]
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

router.delete('/:id', async (request, response) => {
  const { token } = request

  const decodedToken = jwt
    .verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    response
      .status(401)
      .json({ error: 'Invalid authentication' })
      .end()
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response
      .status(404)
      .json({ error: 'blog not found' })
      .end()
  }

  const tokenUser = blog.user
  if (JSON.stringify(user) === JSON.stringify(tokenUser)) {
    response
      .status(401)
      .json({ error: 'wrong authentication' })
      .end()
  }

  await Blog.findByIdAndRemove(request.params.id)
  response
    .status(204)
    .end()
})

router.put('/:id', async (request, response) => {
  const { body } = request

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: body.likes },
    { new: true },
  )
  response.status(201).json(updatedBlog.toJSON())
})

module.exports = router
