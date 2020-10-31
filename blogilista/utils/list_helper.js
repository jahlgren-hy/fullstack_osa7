const dummy = () => 1

const totalLikes = blogs => blogs
  .map(blog => blog.likes)
  .reduce((total, amount) => total + amount, 0)

const byLikes = (a, b) => b.likes - a.likes

const favoriteBlog = blogs => {
  if (blogs === undefined || blogs === null || blogs.length === 0) {
    return {}
  }

  const { title, author, likes } = blogs.sort(byLikes)[0]

  return { title, author, likes }
}

const mostBlogs = blogs => {
  if (blogs === undefined || blogs === null || blogs.length === 0) {
    return null
  }

  const authors = blogs
    .map(b => b.author)
    .reduce((obj, name) => {
      const o = obj
      o[name] = o[name] ? (o[name] + 1) : 1
      return o
    }, {})

  const max = Object.entries(authors)
    .reduce((prev, current) => ((prev[1] > current[1])
      ? prev : current))

  return {
    author: max[0],
    blogs: max[1],
  }
}

const mostLikes = blogs => {
  if (blogs === undefined || blogs === null || blogs.length === 0) {
    return null
  }
  /*
    if (blogs.length === 1) {
      const blogi = {
        author: blogs.author,
        likes: blogs.likes,
      }
      return blogi
    }
  */
  const authors = blogs
    .map(b => ({
      author: b.author,
      likes: b.likes,
    }))

  if (blogs.length === 1) {
    return authors
  }
  const likes = authors
    .reduce((obj, name) => {
      const o = obj
      o[name.author] = o[name.author]
        ? (o[name.author] + name.likes)
        : name.likes
      return o
    }, {})

  const max = Object.entries(likes)
    .reduce((prev, current) => ((prev[1] > current[1])
      ? prev : current))

  return {
    author: max[0],
    likes: max[1],
  }
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
}
