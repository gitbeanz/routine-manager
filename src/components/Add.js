import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
export default function Add(props) {


  return (
    <div className='add-overlay'>
        <div className='add-box'>
            <form onKeyDown= {function(event){return event.key !== 'Enter'}} className='add-form' onSubmit={event=>{event.preventDefault()}}>
                <label className='name' required>Name</label>
                <input className='name-input' placeholder='Enter task name...' onChange={event => props.changeFunct(event) }></input>
                <label className='time' required>Minutes</label>
                <input type='number' step='1' className='time-input' placeholder='Enter time... (min)' onChange={event => props.changeFunctTime(event) }></input>
                <button type='button'className='add-button' onClick={props.addFunct}><FontAwesomeIcon icon={faAdd}/></button>
                <button  type='button' className='cancel-button' onClick={props.cancelFunct}>Cancel</button>
            </form>
        </div>
    </div>
  )
}
 