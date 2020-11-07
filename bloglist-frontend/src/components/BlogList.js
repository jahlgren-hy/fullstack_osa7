import React from 'react'
import { useSelector } from 'react-redux'
import storage from '../utils/storage'

const Blog = ({ blog }) => {
  return (
    <li>
      {blog.title} {blog.author}
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
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </ul>
  )
}

export default BlogList
