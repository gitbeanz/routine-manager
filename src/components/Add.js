import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
export default function Add(props) {
  return (
    <div className='add-overlay'>
        <div className='add-box'>
            <form className='add-form' onSubmit={event=>{event.preventDefault()}}>
                <label className='name'>Name</label>
                <input className='name-input' placeholder='Enter task name...'></input>
                <label className='time'>Time</label>
                <input className='time-input' placeholder='Enter time... (min)'type="number"></input>
                <button className='add-button'><FontAwesomeIcon icon={faAdd}/></button>
                <button className='cancel-button' onClick={props.cancelFunct}>Cancel</button>
            </form>
        </div>
    </div>
  )
}
 