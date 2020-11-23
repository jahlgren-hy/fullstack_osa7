import React from 'react'
import { ListGroup } from 'react-bootstrap'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
// import { ListGroup } from 'react-bootstrap'

// import { useDispatch } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)
  return (
    <aside>
      <header>
        <h1>Users</h1>
      </header>
      <ListGroup variant="flush">
        {
          users.map(user =>
            <ListGroup.Item key={user.id}>
              {user.name} {user.blogs.length}
            </ListGroup.Item>
          )}
      </ListGroup>
    </aside>
  )
}

export default UserList
