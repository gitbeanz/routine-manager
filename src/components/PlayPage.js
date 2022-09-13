import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faFastForward } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function Play(props) {
  
  return (
    <div>
      <div className='play-div-titles'>
      <h1 className='play-h1'>{props.title}</h1>
      </div>
      <div className='play-div-time'>
      <h2 className='play-h2'>{props.taskArray[props.task].title}</h2>
        <h2 className='play-h2-time'>Time Left: 01:59</h2>
        <h2 className='play-h2-time-total'>{props.taskArray[props.task].time} min</h2>
      </div>
      <div className='play-div-options'>
        <button className='play-button'><FontAwesomeIcon icon={faPause}/></button>
        <button className='play-button'><FontAwesomeIcon icon={faCheck}/></button>
        <button className='play-button' onClick={props.skipTask}><FontAwesomeIcon icon={faFastForward}/></button>
      </div>
      <h2 className='play-h2-up-next'>Up next: {!props.nothingNext && props.taskArray[props.nextTask].title}</h2>
      <div className = 'play-div-bottom'> 
      <div className='play-div-button'>
        <button className='play-home-button' onClick={props.exitPlayPage}><FontAwesomeIcon icon={faHome}/></button>
        </div>
        <h2 className='play-h2-eta-time'>{props.estimatedTime}</h2>
        <h2 className='play-h2-eta'>Estimated end time</h2>
      </div>
      <hr className="divider"/> 
        <footer >© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
