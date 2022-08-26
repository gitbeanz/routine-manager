import React from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'
import Routine from './Routine';
var isEmpty = true;

export default function Home() {
    const { count, handleCountClick, handleRoutineName, routineArray} = useRoutineManager();
    function handleClick(){
      if (!isEmpty){
        handleCountClick();
      }
        //console.log(routineArray);
    }
    function handleChange(event){
      if (event.target.value === ''){
        isEmpty = true;
      }
      else{
        isEmpty = false;
      }
        handleRoutineName(event.target.value);
    }
    /*function handleSubmit(key){
      if (key.key === 'Enter'){
        handleClick();
      }
    }
    window.addEventListener('keyup',handleSubmit);*/
    var renderedRoutines = routineArray.map(item=> <Routine title={item} subtitle='NEW' routineClass='new' key={item}/>);
  return (
    <div>
        <h1 className="home-h1">Routine Manager</h1>
        <hr className="divider"/>
        <h2 className="home-h2">Add Routines</h2>
        <Form changeFunct={handleChange} placeholder="Enter new routine name..." formClass="home-form" btnPlaceholder="+" clickFunct={handleClick}/>
        <h2 className='home-h2'>My Routines ({count})</h2>
        <div className="home-routine-section">
        {renderedRoutines}
        </div>
        <hr className="divider"/>
        <footer>© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
