import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

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
    <Form inline onSubmit={handleSubmit}>
      <fieldset>
        <legend><h2>create new</h2></legend>
        <Form.Group>
          <Form.Label htmlFor="title" srOnly>
            title
          </Form.Label>
          <Form.Control
            {...title.fields()}
            id="title"
            placeholder="title"
            aria-describedby="titleHelp"
          />
          <Form.Text id="titleHelp" muted>
            Enter blog title
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author" srOnly>
            author
          </Form.Label>
          <Form.Control
            {...author.fields()}
            id="author"
            placeholder="author"
            aria-describedby="authorHelp"
          />
          <Form.Text id="authorHelp" muted>
            Enter blog author
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url" srOnly>
            url
          </Form.Label>
          <Form.Control
            {...url.fields()}
            id="url"
            placeholder="url"
            aria-describedby="urlHelp"
          />
          <Form.Text id="urlHelp" muted>
            Enter blog url
          </Form.Text>
        </Form.Group>
        <Button id="create-button" type="submit">
          create
        </Button>
      </fieldset>
    </Form>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm