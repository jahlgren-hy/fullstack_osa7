import React from 'react'
import { useSelector } from 'react-redux'
import { selectBlogById } from './blogsSlice'

const BlogListItem = ({ id }) => {
  const blog = useSelector(state => selectBlogById(state, id))
  return (
    <li>
      {blog.title} {blog.author}
    </li>
  )
}

export default BlogListItem
