require('dotenv').config()

const { PORT } = process.env
let { MONGODB_URI } = process.env

if (process.env.NODE_ENV === 'test'
  || process.env.NODE_ENV === 'development'
) {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
}
