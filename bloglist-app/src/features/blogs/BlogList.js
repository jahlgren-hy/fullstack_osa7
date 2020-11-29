import React from 'react'
import { useSelector } from 'react-redux'
import BlogListItem from './BlogListItem'

import { selectBlogIds } from './blogsSlice'

const BlogList = () => {
  const blogIds = useSelector(selectBlogIds)
  console.log(blogIds)
  const renderedBlogItems = blogIds.map(blogId => {
    return <BlogListItem key={blogId} id={blogId} />
  })

  return <ul className="blog-list">{renderedBlogItems}</ul>
}

export default BlogList
