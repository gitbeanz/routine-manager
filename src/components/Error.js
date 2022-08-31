import React from 'react'

export default function Error(props) {
  return (
    <div className='error-overlay' onClick={props.clickFunct}>
        <div className='error-box'>{props.errorText}</div></div>
  )
}
