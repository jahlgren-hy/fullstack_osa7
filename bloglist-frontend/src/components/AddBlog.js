import React, { useEffect, useRef, useState } from 'react'
import BlogForm from '../forms/BlogForm'
import Togglable from './Togglable'

import blogService from '../services/blogs'
import storage from '../utils/storage'

import { createBlog } from '../reducers/blogs'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notification'

const AddBlog = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = useRef()

  useEffect(() => {
    setUser(storage.loadUser())
  }, [])

  const addBlog = async (blog) => {
    try {
      blogService.setToken(user.token)
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog))
      setNotification(
        `Lisätty uusi blogi ${blog.author}'n ${blog.title}`
      )
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

  if (user === null) {
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
