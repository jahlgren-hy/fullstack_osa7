import React from 'react'
import BlogList from './features/blogs/BlogList'

const App = () => {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Bloglist App</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Blogs</h2>
          <div className="blogapp">
            <BlogList />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
