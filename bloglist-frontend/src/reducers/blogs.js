import blogService from '../services/blogs'
import { setNotification } from '../reducers/notification'

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

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(
      setNotification({
        message:
          `Lisätty uusi blogi ${blog.author}'n ${blog.title}`
      }
      )
    )
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

export const likeBlog = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blog = blogs.find(b => b.id === id)
    let liked = { ...blog, likes: blog.likes + 1 }
    liked = blogService.like(id, liked)
    dispatch({
      type: LIKE_BLOG,
      data: liked,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    let blogs = await blogService.getAll()
    let blog = blogs.find(b => b.id === id)
    console.log('...removing', blog)
    try {
      if (window.confirm(`remove blog ${blog.title}`)) {
        blog = blogService.remove(blog.id)
        blogs = blogs.filter(b => b !== blog)
      }
    } catch (error) {
      console.log(error)
    }
    dispatch({
      type: REMOVE_BLOG,
      data: blogs
    })
  }
}

export default blogs
