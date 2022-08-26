import React from 'react'
//import useRoutineManager from '../hooks/useRoutineManager'

export default function Form(props) {
    //const [ handleRoutineName] = useRoutineManager();

  return (
    <div className={props.formClass}>
        <form>
            <input type="text" placeholder={props.placeholder} onChange={event => props.changeFunct(event)}></input>
            <button onClick={props.clickFunct} type="button">{props.btnPlaceholder}</button>
        </form>
    </div>
  )
}
