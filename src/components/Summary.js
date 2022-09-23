import React from 'react'

export default function Summary(props) {
  return (
    <div>
    <h3 className='summary-task-h3'>{props.title}</h3>
    <h3 color={props.color}>{props.difference}</h3>
    </div>
  )
}
