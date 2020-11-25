import axios from 'axios'
import authHeader from './auth-header'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const response =
    await axios.post(
      baseUrl,
      newBlog,
      { headers: authHeader() }
    )
  return response.data
}

const like = async (id, blog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blog)
    return response
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    console.log(message)
  }
}

const remove = async (id) => {
  const response =
    await axios
      .delete(
        `${baseUrl}/${id}`,
        { headers: authHeader() }
      )
  return response
}

export default { getAll, create, like, remove, }
