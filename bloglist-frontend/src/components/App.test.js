import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../reducers'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>, div
  )
  expect(app).toMatchSnapshot()
})