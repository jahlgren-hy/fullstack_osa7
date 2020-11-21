import axios from 'axios'
import { storageKey } from '../utils/storage'

const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  localStorage.setItem(
    storageKey,
    JSON.stringify(response.data)
  )
  return response.data
}


const logout = async () => {
  localStorage.removeItem(storageKey)
}

export default { login, logout }
