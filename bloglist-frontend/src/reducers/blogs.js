import blogService from '../services/blogs'

export const INIT_BLOGS = 'INIT_BLOGS'
export const NEW_BLOG = 'NEW_BLOG'

const blogs = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data
    case NEW_BLOG:
      return [...state, action.data]
    default: return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: NEW_BLOG,
      data: newBlog,
    })
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
