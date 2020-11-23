import {
  INIT_USERS,
} from '../actions/type'

const initialState = []

const users = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USERS:
      return action.data
    default:
      return state
  }
}

export default users
