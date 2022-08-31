import React, { useEffect, useRef } from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'
import Routine from './Routine';
import Error from './Error';

export default function Home() {
    const ref = useRef();

    const { count, handleCountClick, handleRoutineName, routineArray, modal, showModal, errorMessage} = useRoutineManager();
    function handleClick(){
        handleCountClick();
        ref.current.value = '';
        //console.log(routineArray);
    }
    function handleChange(event){
      handleRoutineName(event.target.value);
    }

    function handleErrorClick(){
      showModal(false);
      console.log('this clicked');
  }

  useEffect(()=>{
    window.addEventListener('keyup', handleSubmit)
    return()=> window.removeEventListener('keyup', handleSubmit)
  })

    function handleSubmit(key){
      if (modal){
        showModal(false);
      }
      if (key.key === 'Enter' && !modal){
        handleClick();
      }
    }
    var renderedRoutines = routineArray.map(item=> <Routine title={item} subtitle='NEW' routineClass='new' key={item}/>);
  return (
    <div>
      {modal && <Error clickFunct={handleErrorClick}errorText={errorMessage}/>}
        <h1 className="home-h1">Routine Manager</h1>
        <hr className="divider"/>
        <h2 className="home-h2">Add Routines</h2>
        <Form reference={ref} changeFunct={handleChange} placeholder="Enter new routine name..." formClass="home-form" btnPlaceholder="+" clickFunct={handleClick}/>
        <h2 className='home-h2'>My Routines ({count})</h2>
        <div className="home-routine-section">
        {renderedRoutines}
        </div>
        <hr className="divider"/>
        <footer>© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
