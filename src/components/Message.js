import React from 'react'

export default function Message(props) {
  return (
    <div className='alert alert-danger'>
         {props.children}
    </div>
 
  )
}
