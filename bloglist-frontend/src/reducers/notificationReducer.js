import { SET_NOTIFICATION } from '../actions'


const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default: return state
  }
}

export const setNotification = (notification, duration) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: ''
      })
    }, 1000 * duration)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
  }
}

export default notificationReducer
