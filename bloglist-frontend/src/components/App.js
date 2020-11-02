import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from '../forms/BlogForm'
import LoginForm from '../forms/LoginForm'
import Notification from './Notification'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'
import storage from '../utils/storage'

import { setNotification } from '../reducers/notification'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const createBlog = async (blog) => {
    try {

      const newBlog = await blogService
        .create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      dispatch()
      setNotification(
        {
          message: `a new blog '${newBlog.title}' by ${newBlog.author} added!`,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService
        .login({ username, password, })

      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(setNotification(
        { message: `${user.name} welcome back!` },
      ))
      storage.saveUser(user)
    } catch (error) {
      dispatch(setNotification(
        {
          message: 'wrong username/password',
          type: 'error'
        }
      ))
      setUsername('')
      setPassword('')
      console.log(error)
    }
  }

  const handleLogout = async () => {
    dispatch(setNotification(
      { message: `${user.name} logged out` },
    ))
    setUser(null)
    storage.logoutUser()
  }

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm onSubmit={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(b =>
          <Blog key={b.id} blog={b} />
        )}
    </div>
  )

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  return (
    <main className="App">
      <header>
        <h1> Blogs</h1>
      </header>
      <Notification />
      {user === null && loginForm()}
      {user !== null && blogView()}
    </main>
  )
}

export default App
