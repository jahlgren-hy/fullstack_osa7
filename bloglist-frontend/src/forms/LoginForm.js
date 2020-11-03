import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </section >
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
