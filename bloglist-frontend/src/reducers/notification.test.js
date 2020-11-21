import notification from './notification'
import { SET_NOTIFICATION, CLEAR_NOTIFICATION }
  from '../actions/type'
import deepFreeze from 'deep-freeze'

describe('notification reducer', () => {
  it('should handle initial state', () => {
    expect(
      notification(undefined, {})
    ).toEqual(null)
  })

  it('should handle SET_NOTIFICATION', () => {
    const state = []
    let action = {
      type: SET_NOTIFICATION,
      data: {
        message: 'test message',
      }
    }

    deepFreeze(state)

    let nextState = notification(state, action)
    expect(nextState).toEqual(action.data)

    action = {
      type: SET_NOTIFICATION,
      data: {
        message: 'test message',
        type: 'test'
      }
    }

    nextState = notification(state, action)
    expect(nextState).toEqual(action.data)
    expect(nextState).toMatchSnapshot()
  })

  it('should handle CLEAR_NOTIFICATION', () => {
    const state = []
    let action = {
      type: SET_NOTIFICATION,
      data: {
        message: 'test message',
      }
    }

    deepFreeze(state)

    let nextState = notification(state, action)
    expect(nextState).toEqual(action.data)

    action = {
      type: CLEAR_NOTIFICATION,
    }

    nextState = notification(state, action)
    expect(nextState).toEqual(null)
    expect(nextState).toMatchSnapshot()
  })
})
