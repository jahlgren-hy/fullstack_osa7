import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '../actions/type'

let timeoutId

export const setNotification = ({ message, type = 'success' }, timeout = 5) => {
  return async dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      data: { message, type }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIFICATION
      })
    }, timeout * 1000)
  }
}
