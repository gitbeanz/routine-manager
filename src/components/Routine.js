import React from 'react'



export default function Routine(props) {
  return (
    <div id={props.title} className='routine' onClick={props.routineClick}>
        <p className={props.routineClass}>{props.subtitle} min</p>
        <p className='title'>{props.title}</p>
        </div>
  )
}
