import React, { useEffect, useRef } from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'
import Routine from './Routine';
import Error from './Error';
import RoutinePage from './RoutinePage';
let routineOpened = '';

export default function Home() {
    const ref = useRef();
    const {selectRoutineData, dataArray, homePageUpdate, routineOpened, setRoutineOpened, setTotalTime, currentTotalTime, routineDelete, count, handleCountClick, handleRoutineName, routineArray, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, makeRoutineData, routineData} = useRoutineManager();
    useEffect(()=>{
      //console.log('change detected');
    },[homeStatus])

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
    var renderedRoutines = dataArray.map(item=> <Routine routineClick = {openRoutinePage} title={item.title} subtitle={item.time} routineClass='new' key={item.title}/>);
    function openRoutinePage(event){
      let selectedRoutine = event.target.id;
      console.log('THIS CALLED')
      if (event.target.firstChild.innerHTML === '0 min'){
        setTotalTime(0);
      }
      else{
        setTotalTime(dataArray.find(element=>element.title === selectedRoutine).time)
      }
      setRoutineOpened(selectedRoutine);
      selectRoutineData(selectedRoutine)
      routinePageOpen();
    }
    function handleHomeOpen(){
      console.log(routineOpened);
      console.log(currentTotalTime);
      homePageUpdate(routineOpened, currentTotalTime);
      homePageOpen();
      console.log('PRINTING DATA ARRAY');
      dataArray.forEach((element)=>{
        console.log(element);
      })
    }
    function handleRoutineDelete(id){
      console.log(id);
      routineDelete(id);
    }
  return (
    <div>
      {homeStatus &&<div>
      {modal && <Error clickFunct={handleErrorClick}errorText={errorMessage}/>}
        <h1 className="home-h1">Routine Manager</h1>
        <hr className="divider"/>
        <h2 className="home-h2">Add Routines</h2>
        <Form reference={ref} changeFunct={handleChange} placeholder=" Enter new routine name..." formClass="home-form" btnPlaceholder="+" clickFunct={handleClick}/>
        <h2 className='home-h2'>My Routines ({count})</h2>
        <div className="home-routine-section">
        {renderedRoutines}
        </div>
        <hr className="divider"/>
        <footer>© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
        </div>}
        {!homeStatus && <RoutinePage timeSet={setTotalTime} totalTime={currentTotalTime} deleteFunct={handleRoutineDelete}clickFunct={handleHomeOpen} title={routineData.title} time={routineData.time}/>}
    </div>
  )
}
