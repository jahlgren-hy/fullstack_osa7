import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/type'
import { storageKey } from '../utils/storage'

import authService from '../services/login'
import { setNotification } from '../reducers/notification'

const user = JSON.parse(localStorage.getItem(storageKey))

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await authService
        .login({
          username: username.value,
          password: password.value
        })

      dispatch(setNotification(
        { message: `${user.name} welcome back!` },
      ))

      dispatch({
        type: LOGIN_SUCCESS,
        data: user,
      })
    } catch (error) {
      dispatch(setNotification(
        {
          message: 'wrong username/password',
          type: 'danger',
        }
      ))
      dispatch({
        type: LOGIN_FAIL,
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(setNotification(
      { message: `${user.name} logged out` },
    ))
    authService.logout()
    dispatch({
      type: LOGOUT,
    })
  }
}

export default auth
