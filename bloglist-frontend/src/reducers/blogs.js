import {
  INIT_BLOGS,
  NEW_BLOG,
  LIKE_BLOG,
  REMOVE_BLOG,
} from '../actions/type'

const blogs = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data
    case NEW_BLOG:
      return [...state, action.data]
    case LIKE_BLOG:
      return [...state, action.data]
    case REMOVE_BLOG:
      return action.data
    default: return state
  }
}

export default blogs
