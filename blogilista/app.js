const express = require('express')
require('express-async-errors')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const app = express()
app.use(helmet())

logger.info(`Environment on app.js: ${process.env.NODE_ENV}`)
app.use(cors())
app.use(express.json())

morgan
  .token('body', req => JSON.stringify(req.body))
app.use(morgan(
  ':method '
  + ':url '
  + ':status '
  + ':res[content-length] - '
  + ':response-time ms '
  + ':body',
))

logger.info('connecting to https://cloud.mongodb.com/v2/5e7cac3ad304d4549b07e897#')

mongoose.connect(config.MONGODB_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
