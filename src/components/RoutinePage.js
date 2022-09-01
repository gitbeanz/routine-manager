import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

export default function RoutinePage(props) {
  return (
    <div>
    <div className='routine-div'>
        <h1 className='routine-title'>{props.title}</h1>
        <button className='routine-home-button'onClick={props.clickFunct}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
        <h2 className='routine-subtitle'>0 minutes</h2>
        <h2 className='routine-task-title'>My Tasks (0)</h2>
    </div>
    <div className='routine-task-section'></div>
    <div className='routine-task-options'><button className='routine-button'><FontAwesomeIcon icon={faAdd}></FontAwesomeIcon></button><button className='routine-start-button'>Start</button><button className='routine-button'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></div>
    <hr className="divider"/>
        <footer>© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
