import React, { useEffect, useRef } from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'
import Routine from './Routine';
import Error from './Error';
import RoutinePage from './RoutinePage';
import PlayPage from './PlayPage';

export default function Home() {
  
    const ref = useRef();
    const {paused, setPause, setTimerID, timerID, timeLeft, setTimeLeft, estimatedTime, calculateEstimatedTime, nextTask, setNext, nothingNext, setNothingNext, setTaskQueue, taskQueue, exitPlay, playStatus, enterPlayPage, checkTaskValidity, setTime, setTask, taskDelete, currentTime,currentTask,  setTaskCount, taskCount, timeChange, taskChange, setTaskArray, taskArray, addTask, selectRoutineData, dataArray, homePageUpdate, routineOpened, setRoutineOpened, setTotalTime, currentTotalTime, routineDelete, count, handleCountClick, handleRoutineName, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, routineData} = useRoutineManager();
    useEffect(()=>{
      //console.log('change detected');
    },[homeStatus])

    var myInterval;
    let skipCount = 0;
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
      //set up play page
      homePageUpdate(routineOpened, currentTotalTime, taskArray);
      skipCount = 0;
      setTaskQueue(0);
      startTimer();
      setNothingNext(false);
      setNext(0);
      calculateEstimatedTime();
     
      console.log('called');
      console.log(taskArray);
      if (taskArray.length > 1){
        //there is more than 1 task, meaning there's at least one task that's up next
        setNext(1);
        setNothingNext(false);
      }
      else{
        //only one task, nothing next!
        setNothingNext(true);
        console.log('there is nothing next');
      }
      
      enterPlayPage()
    }
    function startTimer(){
      console.log(taskArray);
      console.log(taskQueue);
      console.log(skipCount);
      setTimeLeft(timeConvert(taskArray[skipCount].time * 60));
      let startTime = taskArray[skipCount].time * 60;
      var start = Date.now();
      myInterval = setInterval(function(){
        setTimerID(myInterval);
        var delta = Date.now() - start;
        var newTime = startTime -Math.floor(delta/1000)
        console.log('TIMER RUNNING')
        console.log(myInterval);
        if (newTime >= 0){
        setTimeLeft( timeConvert(newTime));
        }
        else{
          stopTimer();
        }
      }, 1000)
    }
    function stopTimer(){
      console.log('STOPPING TIMER');
      console.log(myInterval);
      console.log(timerID);
      setTimeLeft(timeConvert(0));
      clearInterval(timerID);
    }
    function timeConvert(seconds){
      let timeString = '';
      let timeMinutes= '';
      let timeHours = '';
      let timeSeconds = '';
      let hours = Math.floor(seconds / 3600);

      seconds %= 3600;
      let minutes = Math.floor(seconds / 60);
      seconds %= 60;

      timeHours = hours.toString();
      timeMinutes = minutes.toString();
      timeSeconds = seconds.toString();
      if (hours < 10){
        timeHours = '0' + hours.toString();
      }
      if (minutes < 10){
        timeMinutes = '0' + minutes.toString();
      }
      if (seconds < 10){
        timeSeconds= '0' + seconds.toString();
      }
      timeString += timeHours;
      timeString += ':';
      timeString += timeMinutes;
      timeString += ':';
      timeString += timeSeconds;
      return timeString;
    }

    function exitPlayPage(){
      stopTimer();
      setTaskQueue(0);
      handleHomeOpen();
      exitPlay()
    }
   function skipTask(){
    //first, check if this is the last task
    if (taskQueue === taskArray.length-1){
      //there is nothing to skip, finish the routine, send to summary page
      setNothingNext(true);
    }
    else if (taskQueue === taskArray.length-2){
      //second to last
      setTaskQueue(taskQueue+1);
      skipCount+=1;
      setNothingNext(true);
      stopTimer();
      startTimer();
      console.log(taskQueue);
    }
    else{
      setTaskQueue(taskQueue+1);
      skipCount+=1;
      setNext(nextTask+1);
      setNothingNext(false);
      stopTimer();
      console.log(taskQueue);
      startTimer();
    }
   }
   function pauseTask(){
    setPause(true);
    console.log('PAUSED');
   }

   function unpauseTask(){
    setPause(false);
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
        {!homeStatus && playStatus && <PlayPage unpauseTask={unpauseTask}paused={paused} pauseTask={pauseTask}timeLeft={timeLeft} estimatedTime={estimatedTime}task={taskQueue}nextTask={nextTask}skipTask={skipTask}nothingNext={nothingNext}setTaskQueue={setTaskQueue}taskArray={taskArray}exitPlayPage={exitPlayPage}title={routineData.title}/>}
    </div>
  )
}
