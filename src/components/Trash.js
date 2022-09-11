import React from 'react'

export default function Trash(props) {
  return (
    <div className='add-overlay'>
        <div className='trash-box'>
            <p className='delete-msg'>Are you sure you want to delete this {props.type}?</p>
            <button className='trash-cancel-button' onClick={props.cancelFunct}>Cancel</button>
            <button className='trash-yes-button' onClick={props.deleteFunct}>Yes</button>
        </div>
    </div>
  )
}
