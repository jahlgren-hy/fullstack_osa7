import React, { useRef } from 'react'
import BlogForm from '../forms/BlogForm'
import Togglable from './Togglable'

import { createBlog } from '../actions/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'

const AddBlog = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = useRef()
  const { user: currentUser } =
    useSelector(state => state.auth)

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog))
      title.reset()
      author.reset()
      url.reset()
    } catch (error) {
      title.reset()
      author.reset()
      url.reset()
      console.log(error)
    }
  }

  if (currentUser === null) {
    return null
  }

  return (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )
}

export default AddBlog
