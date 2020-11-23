import userService from '../services/users'

import {
  INIT_USERS,
} from './type'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: INIT_USERS,
      data: users,
    })
  }
}
