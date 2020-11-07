import blogService from '../services/blogs'

export const INIT_BLOGS = 'INIT_BLOGS'

const blogs = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    })
  }
}

export default blogs
