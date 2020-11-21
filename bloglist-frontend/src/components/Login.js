import React from 'react'
import LoginForm from '../forms/LoginForm'
//import authService from '../services/login'

//import { setNotification } from '../reducers/notification'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'

import { login, logout } from '../reducers/auth'

const Login = () => {
  const dispatch = useDispatch()

  const { isLoggedIn, user: currentUser }
    = useSelector(state => {
      return state.auth
    })

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    //    try {
    /*
      const user = await authService
        .login({
          username: username.value,
          password: password.value
        })
*/
    dispatch(login(username, password))
    username.reset()
    password.reset()
    /*
      dispatch(setNotification(
        { message: `${user.name} welcome back!` },
      ))
      */
    // storage.saveUser(user)
    /*    } catch (error) {
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
    */
  }

  const handleLogout = async () => {
    dispatch(logout())
    // await authService.logout()
    // storage.logoutUser()
  }

  if (isLoggedIn) {
    return (
      <section>
        <p>{currentUser.name} logged in &nbsp;
          <Button
            variant="primary"
            size="sm"
            onClick={handleLogout}>
            logout
          </Button>
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
}

export default Login
