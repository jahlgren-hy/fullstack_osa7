import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from './auth'
import blogReducer from './blogs'
import notificationReducer from './notification'

const reducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
  notification: notificationReducer,
})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
