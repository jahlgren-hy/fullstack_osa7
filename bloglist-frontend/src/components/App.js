import React, { useEffect } from 'react'
import AddBlog from './AddBlog'
import BlogList from './BlogList'
import UserList from './UserList'
import Login from './Login'
import Notification from './Notification'

import { initializeBlogs } from '../reducers/blogs'
import { initializeUsers } from '../actions/users'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <main className="container">
      <header>
        <h1> Blogs</h1>
      </header>
      <Notification />
      <Login />
      <AddBlog />
      <BlogList />
      <UserList />
    </main>
  )
}

export default App
