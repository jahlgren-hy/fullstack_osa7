import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Button, Collapse, Table } from 'react-bootstrap'

import blogService from '../services/blogs'
import storage from '../utils/storage'
import { likeBlog, removeBlog } from '../reducers/blogs'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('view')

  const dispatch = useDispatch()

  useEffect(() => {
    open ? setValue('hide') : setValue('view')
  }, [open])

  const user = storage.loadUser()

  const onLike = (event) => {
    event.preventDefault()
    console.log('like button clicked', blog)
    dispatch(likeBlog(blog.id))
  }

  const onRemove = (event) => {
    event.preventDefault()
    console.log('remove button clicked', blog)
    blogService.setToken(user.token)
    dispatch(removeBlog(blog.id, blog))
  }

  return (
    <tr>
      <td>
        {blog.title} {blog.author}
      </td>
      <td key={blog.id}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="blog-details"
          aria-expanded={open}
        >{value}
        </Button>
        <Collapse in={open}>
          <aside id="blog-details">
            <a href={blog.url} rel="noopener noreferrer" target="_blank">
              {blog.url}
            </a>
            <p>
              {blog.likes} likes
              <Button
                onClick={onLike}
              >like
              </Button>
            </p>
            <p>
              {user.name}
              {user && user.name === blog.author ?
                <Button
                  onClick={onRemove}
                >remove
                </Button> :
                null
              }
            </p>
          </aside>
        </Collapse>
      </td>
    </tr>
  )
}

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = storage.loadUser()
  if (user === null) {
    return null
  }
  return (
    <Table striped bordered hover size="sm">
      <tbody>
        {
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
      </tbody>
    </Table>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default BlogList
