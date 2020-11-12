import React, { useState, useImperativeHandle } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <ButtonGroup>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}
        className="togglable-content">
        {props.children}
        <Button onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </ButtonGroup>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
