import React, { useState, useEffect } from 'react'

import LoginForm from '../forms/LoginForm'
import loginService from '../services/login'
import storage from '../utils/storage'

import { setNotification } from '../reducers/notification'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

const Login = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    setUser(storage.loadUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService
        .login({
          username: username.value,
          password: password.value
        })

      setUser(user)
      username.reset()
      password.reset()
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
      username.reset()
      password.reset()
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

  if (user !== null) {
    return (
      <section>
        <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </section>
    )
  }
  return (
    <LoginForm
      onSubmit={handleLogin}
      username={username}
      password={password}
    />
  )
  /*
  return (
    <section>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <input {...username.fields()} />
        <input {...password.fields()} />
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </section>
  )
  */
}

export default Login
