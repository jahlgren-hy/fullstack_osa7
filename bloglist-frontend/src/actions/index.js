/*
 * action types
 */
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
/*
 * other constants
 */

/*
 * action creators
 */
export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    data: {
      message: notification.message,
      type: notification.type
    }
  }
}
