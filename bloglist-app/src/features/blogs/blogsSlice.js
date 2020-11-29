import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'

const blogsAdapter = createEntityAdapter()
const initialState = blogsAdapter.getInitialState({
  status: 'idle',
})

// Thunk functions
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
})

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBlogs.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        blogsAdapter.setAll(state, action.payload)
      })
  },
})

export default blogsSlice.reducer

export const {
  selectAll: selectBlogs,
  selectById: selectBlogById,
} = blogsAdapter.getSelectors(state => state.blogs)

export const selectBlogIds = createSelector(selectBlogs, blogs =>
  blogs.map(blog => blog.id)
)
