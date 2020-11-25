import React, { useEffect } from 'react'
import AddBlog from './AddBlog'
import BlogList from './BlogList'
import UserList from './UserList'
import Login from './Login'
import Notification from './Notification'

import { initializeBlogs } from '../actions/blogs'
import { initializeUsers } from '../actions/users'
import { useDispatch } from 'react-redux'

import { Container } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container as="main">
      <header>
        <h1> Blogs</h1>
      </header>
      <Notification />
      <Login />
      <AddBlog />
      <BlogList />
      <UserList />
    </Container>
  )
}

export default App
