const initialState = {
  message: null,
  type: 'info'
}

const notificationReducer =
(state = initialState, action) => {
  switch (action.type) {
  case 'notification/setNotification': {
    return action.payload
  }
  default:
    return state
  }
}

export const setNotification = (notification) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'notification/setNotification',
        payload: { message: null, type: 'info' }
      })
    }, 5000)
    dispatch({
      type: 'notification/setNotification',
      payload: notification
    })
  }
}

export default notificationReducer
