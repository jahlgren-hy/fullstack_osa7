export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const notification = (state = null, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case CLEAR_NOTIFICATION:
      return null
    default: return state
  }
}

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
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeout * 1000)
  }
}

export default notification
