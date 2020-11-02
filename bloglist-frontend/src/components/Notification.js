import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)

  if (notification === null) {
    return null
  }

  return (
    <aside className={notification.type}>
      {notification.message}
    </aside>
  )
}

export default Notification
