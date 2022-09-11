import React from 'react'

export default function Task(props) {
    return (
        <div onClick={props.clickFunct}id={props.title} className='routine'>
            <p className='time-subtitle'>{props.subtitle} min</p>
            <p className='title'>{props.title}</p>
            </div>
      )
}
