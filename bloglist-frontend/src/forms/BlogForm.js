import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  onSubmit,
  title,
  author,
  url
}) => {

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: title.value,
        author: author.value,
        url: url.value,
      }
      await onSubmit(blog)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend><h2>create new</h2></legend>
        <div className="form-group">
          <label htmlFor="title">
            title
            <input {...title.fields()} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="author">
            author
            <input {...author.fields()} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="url">
            url
            <input {...url.fields()} />
          </label>
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </fieldset>
    </form>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm