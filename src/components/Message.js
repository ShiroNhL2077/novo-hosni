import React from 'react'

export default function Message(props) {
  return (
    <div className='text-danger'>{props.children}</div>
  )
}
