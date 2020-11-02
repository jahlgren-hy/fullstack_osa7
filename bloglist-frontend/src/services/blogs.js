import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios
    .delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, like, remove, setToken }