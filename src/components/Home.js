import React, { useEffect, useRef } from 'react'
import useRoutineManager from '../hooks/useRoutineManager';
import Form from './Form'
import Routine from './Routine';
import Error from './Error';
import RoutinePage from './RoutinePage';
import PlayPage from './PlayPage';
import SummaryPage from './SummaryPage';

export default function Home() {
    const ref = useRef();
    const {setDifferenceArray, differenceArray, timeDone, calculateCurrentTime,timeStarted, setTimeStarted, exitSummaryPage, setSummaryArray, finishPlayPage, summaryArray, updateSummaryArray, exitPlayPage, timeFinished, setTimeFinished, summaryStatus, setSummaryStatus, createSuccessArray, completedTaskArray, timeLeftColor, setTimeLeftColor, setTimerID, timerID, timeLeft, setTimeLeft, estimatedTime, calculateEstimatedTime, nextTask, setNext, nothingNext, setNothingNext, setTaskQueue, taskQueue, exitPlay, playStatus, enterPlayPage, checkTaskValidity, setTime, setTask, taskDelete, currentTime,currentTask,  setTaskCount, taskCount, timeChange, taskChange, setTaskArray, taskArray, addTask, selectRoutineData, dataArray, homePageUpdate, routineOpened, setRoutineOpened, setTotalTime, currentTotalTime, routineDelete, count, handleCountClick, handleRoutineName, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, routineData} = useRoutineManager();
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
    var renderedRoutines = dataArray.map(item=> <Routine  routineClick = {openRoutinePage} title={item.title} subtitle={item.time} routineClass='new' key={item.title}/>);
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
      setSummaryArray([]);
      setDifferenceArray([]);
      /*skipCount = 0;
      setTaskQueue(0);
      startTimer();
      setTimeLeftColor('black');
      createSuccessArray();
      setNothingNext(false);
      setNext(0);
      calculateEstimatedTime();
     
      console.log('called');
      console.log(taskArray);
      */
      setTaskQueue(0);
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
      calculateEstimatedTime();
      enterPlayPage()
    }
 
   

   //todo: make a state for an array that displays the timeLeft on each task, everytime pause is called, stop the interval. Modify start so that the timeleft array is what is called on instead of taskarray, and timeLeft carries on where it left on using unpause

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
        {!homeStatus && !playStatus && !summaryStatus && <RoutinePage startPlay={startPlay}checkTaskValidity={checkTaskValidity} setTime={setTime}setTask={setTask}task={currentTask}taskTime={currentTime} taskCount={taskCount}timeChange={timeChange} taskChange={taskChange} timeSet={setTotalTime} totalTime={currentTotalTime} deleteTaskFunct={handleTaskDelete} deleteFunct={handleRoutineDelete}clickFunct={handleHomeOpen} title={routineData.title} time={routineData.time} taskArray={taskArray} addTask={addTask}/>}
        {!homeStatus && playStatus && !summaryStatus && <PlayPage calculateCurrentTime={calculateCurrentTime}updateSummaryArray={updateSummaryArray} finishPlayPage={finishPlayPage} exitPlayPage={exitPlayPage}setTimeFinished={setTimeFinished}setTimeLeftColor={setTimeLeftColor}color={timeLeftColor}timeLeft={timeLeft} estimatedTime={estimatedTime}task={taskQueue}nextTask={nextTask} setNextTask={setNext} nothingNext={nothingNext} setNothingNext={setNothingNext}setTaskQueue={setTaskQueue}taskArray={taskArray}title={routineData.title}/>}
        {!homeStatus && !playStatus && summaryStatus && <SummaryPage taskArray={taskArray} differenceArray={differenceArray}timeDone={timeDone}timeStarted={timeStarted} title={routineData.title} timeFinished={timeFinished} summaryArray={summaryArray} exitSummaryPage={exitSummaryPage}/>}
    </div>
  )
}
