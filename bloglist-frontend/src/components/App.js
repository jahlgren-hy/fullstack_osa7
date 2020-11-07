import React, { useEffect, useState } from 'react'
import LoginForm from '../forms/LoginForm'
import BlogList from './BlogList'
import Notification from './Notification'
import blogService from '../services/blogs'
import loginService from '../services/login'
import storage from '../utils/storage'

import { initializeBlogs } from '../reducers/blogs'
import { setNotification } from '../reducers/notification'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    setUser(storage.loadUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService
        .login({ username, password, })

      setUser(user)
      setUsername('')
      setPassword('')

      storage.saveUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: 'wrong credentials',
            type: 'error',
          }
        )
      )
      // setUser(user)
      setUsername('')
      setPassword('')
      //storage.saveUser(user)
    }
  }

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
      {user === null &&
        loginForm()
      }
      <BlogList />
    </main>
  )
}

export default App
