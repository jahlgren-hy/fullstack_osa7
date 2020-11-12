import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({
  onSubmit,
  username,
  password
}) => {
  return (
    <Form
      className="form-signin"
      onSubmit={onSubmit}>
      <fieldset>
        <legend>log in to application</legend>
        <Form.Group>
          <Form.Label htmlFor="username" srOnly>
            username
          </Form.Label>
          <Form.Control
            {...username.fields()}
            id="username"
            placeholder="username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password" srOnly>
            password
          </Form.Label>
          <Form.Control
            {...password.fields()}
            placeholder="password"
            id="password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit">
          login
        </Button>
      </fieldset>
    </Form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
