import React, { useEffect } from 'react'
import BlogList from './BlogList'
import Login from './Login'
import Notification from './Notification'

import { initializeBlogs } from '../reducers/blogs'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <main className="app">
      <header>
        <h1> Blogs</h1>
      </header>
      <Notification />
      <Login />
      <BlogList />
    </main>
  )
}

export default App
