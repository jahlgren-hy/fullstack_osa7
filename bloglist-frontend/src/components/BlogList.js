import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import storage from '../utils/storage'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const [value, setValue] = useState('view')

  useEffect(() => {
    showAll ? setValue('hide') : setValue('view')
  }, [showAll])

  const handleClick = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  if (showAll === false) {
    return (
      <li>
        {blog.title} {blog.author}
        <button
          type="button"
          className="btn btn-link"
          onClick={handleClick}
        >{value}
        </button>
      </li>
    )
  }
  return (
    <li>
      {blog.title} {blog.author}
      <button
        type="button"
        className="btn btn-link"
        onClick={handleClick}
      >{value}
      </button>
      <aside>
        <a href={blog.url} rel="noopener noreferrer" target="_blank">
          {blog.url}
        </a>
        <p>
          {blog.likes} likes
        </p>
        <p>
          {blog.user.name}
        </p>
      </aside>
    </li>
  )
}
const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = storage.loadUser()
  if (user === null) {
    return null
  }
  return (
    <ul>
      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
    </ul>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default BlogList
