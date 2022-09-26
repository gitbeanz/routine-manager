import React from 'react'

export default function Summary(props) {
  return (
    <div>
    <h3 className='summary-task-h3'>{props.title}</h3>
    <div className='summary-description-div'>
    <h3 className='summary-time-h3'>{props.time} min</h3>
    <h3 className='summary-difference-h3'style={{color: props.color}}>{props.difference}</h3>
    </div>
    </div>
  )
}
