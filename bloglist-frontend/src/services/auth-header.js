import { storageKey } from '../utils/storage'

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem(storageKey))

  if (user && user.token) {
    // return { Authorization: 'Bearer ' + user.token }
    // for Node.js Express back-end
    return { 'x-access-token': user.token }
  } else {
    return {}
  }
}

