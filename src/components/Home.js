import React, { useEffect, useRef } from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'
import Routine from './Routine';
import Error from './Error';
import RoutinePage from './RoutinePage';
import PlayPage from './PlayPage';

export default function Home() {
    const ref = useRef();
    const {nothingNext, setNothingNext, setTaskQueue, taskQueue, exitPlay, playStatus, enterPlayPage, checkTaskValidity, setTime, setTask, taskDelete, currentTime,currentTask,  setTaskCount, taskCount, timeChange, taskChange, setTaskArray, taskArray, addTask, selectRoutineData, dataArray, homePageUpdate, routineOpened, setRoutineOpened, setTotalTime, currentTotalTime, routineDelete, count, handleCountClick, handleRoutineName, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, routineData} = useRoutineManager();
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
        setTaskArray([]);
        setTaskCount(0);
      }
      else{
        setTotalTime(dataArray.find(element=>element.title === selectedRoutine).time)
        setTaskArray(dataArray.find(element=>element.title === selectedRoutine).taskArray);
        setTaskCount(dataArray.find(element=>element.title === selectedRoutine).taskArray.length);
      }
      setRoutineOpened(selectedRoutine);
      selectRoutineData(selectedRoutine)
      routinePageOpen();
    }
    function handleHomeOpen(){
      console.log(routineOpened);
      console.log(currentTotalTime);
      console.log(taskArray);
      homePageUpdate(routineOpened, currentTotalTime, taskArray);
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
    function handleTaskDelete(id){
      console.log('now this ran');
      taskDelete(id);
    }
    function startPlay(){
      homePageUpdate(routineOpened, currentTotalTime, taskArray);
      setTaskQueue(taskArray);
      console.log(taskArray);
      console.log(taskQueue);
      checkIfNext();
      enterPlayPage()
    }
    function exitPlayPage(){
      handleHomeOpen();
      exitPlay()
    }
    function skipTask(){
      console.log('this called');
      checkIfNextSkip();
      setTaskQueue(taskArray.filter((element, index)=>{
        if (index === 0){
          return false;
        }
        else{
          return true;
        }
      }))
    }
    function checkIfNext(){
      console.log('this logged!')
      console.log(taskQueue);
      if (taskQueue.length>1){
        console.log('something next!');
        setNothingNext(false);
      }
      else{
        console.log('nothing next!!');
        setNothingNext(true);
      }
    }
    function checkIfNextSkip(){
      console.log('this logged!')
      console.log(taskQueue);
      if (taskQueue.length-1>1){
        console.log('something next!');
        setNothingNext(false);
      }
      else{
        console.log('nothing next!!');
        setNothingNext(true);
      }
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
        {!homeStatus && !playStatus && <RoutinePage startPlay={startPlay}checkTaskValidity={checkTaskValidity} setTime={setTime}setTask={setTask}task={currentTask}taskTime={currentTime} taskCount={taskCount}timeChange={timeChange} taskChange={taskChange} timeSet={setTotalTime} totalTime={currentTotalTime} deleteTaskFunct={handleTaskDelete} deleteFunct={handleRoutineDelete}clickFunct={handleHomeOpen} title={routineData.title} time={routineData.time} taskArray={taskArray} addTask={addTask}/>}
        {!homeStatus && playStatus && <PlayPage skipTask={skipTask}nothingNext={nothingNext}setTaskQueue={setTaskQueue}taskQueue={taskQueue}exitPlayPage={exitPlayPage}title={routineData.title}/>}
    </div>
  )
}
