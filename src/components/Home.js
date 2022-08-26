import React from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'

export default function Home() {
    const { count, handleCountClick, handleRoutineName, routineArray} = useRoutineManager();
    function handleClick(){
        handleCountClick();
        console.log(routineArray);
    }
    function handleChange(event){
        handleRoutineName(event.target.value);
    }
    var renderedTasks = routineArray.map(item=> <div>{item}</div>);
  return (
    <div>
        <h1 className="home-h1">Routine Manager</h1>
        <hr className="divider"/>
        <h2 className="home-h2">Add Routines</h2>
        <Form changeFunct={handleChange} placeholder="Enter new routine name..." formClass="home-form" btnPlaceholder="+" clickFunct={handleClick}/>
        <h2 className='home-h2'>My Routines ({count})</h2>
        {renderedTasks}

    </div>
  )
}
