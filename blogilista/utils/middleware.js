const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response
    .status(404)
    .send({
      error: `Not Found: ${request.url}`,
    })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError'
    && error.kind === 'ObjectId') {
    return response
      .status(400)
      .send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return response
      .status(401)
      .json({
        error: 'invalid token',
      })
  }

  return next(error)
}

const tokenExtractor = (request, _response, next) => {
  const { authorization } = request.headers
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
}
