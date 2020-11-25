import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../actions/type'

const notification = (state = null, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case CLEAR_NOTIFICATION:
      return null
    default: return state
  }
}

export default notification
