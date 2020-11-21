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
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response
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
