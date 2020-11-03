import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import LoginForm from '../forms/LoginForm'
import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from '../reducers/notification'

const Login = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

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

  return (
    <section>
      <h2>log in to application</h2>
      {user === null &&
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      }
    </section>
  )
}

export default Login
