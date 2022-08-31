import React from 'react'

export default function Routine(props) {
  return (
    <div className='routine'>
        <p className={props.routineClass}>{props.subtitle}</p>
        <p className='title'>{props.title}</p>
        </div>
  )
}
