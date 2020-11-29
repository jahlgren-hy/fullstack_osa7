import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '../features/blogs/blogsSlice'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
  },
})
