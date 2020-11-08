import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  onSubmit,
  username,
  password
}) => {
  return (
    <section>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>log in to application</legend>
          <div className="form-group">
            <label htmlFor="username">
              username
              <input {...username.fields()} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              password
              <input {...password.fields()} />
            </label>
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </fieldset>
      </form>
    </section >
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
