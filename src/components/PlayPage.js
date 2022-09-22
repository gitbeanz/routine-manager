import React, { startTransition } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import useRoutineManager from '../hooks/useRoutineManager'
import { faStop } from '@fortawesome/free-solid-svg-icons'


export default function Play(props) {
  const {playing, setPlaying, timeLeft, setTimeLeft, setTimerID, timerID} = useRoutineManager();
  let startTime = props.taskArray[props.task].time * 60;
  let tasksFinished = [];
  function timeConvert(seconds){
    let timeString = '';
    let timeMinutes= '';
    let timeHours = '';
    let timeSeconds = '';
    let isNegative = false;
    if (seconds < 0){
      isNegative = true;
      seconds *= -1;
      props.setTimeLeftColor('#FF2626')
    }
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
    if (isNegative){
      timeString += '-';
    }
    timeString += timeHours;
    timeString += ':';
    timeString += timeMinutes;
    timeString += ':';
    timeString += timeSeconds;
    return timeString;
  }
  function startTimer(){
    console.log(timerID);
    if (timerID === 0){
      setPlaying(true);
      if (props.task === 0){
        console.log('hi');
     setTimeLeft(timeConvert(startTime));
      }
     var start = Date.now();
     var myInterval = setInterval(function(){
      var delta = Date.now() - start;
      var newTime = startTime -Math.floor(delta/1000)
      setTimeLeft(timeConvert(newTime));
     },1000)
     setTimerID(myInterval);
    }
  }
  function resetTimer(){
    clearInterval(timerID);
    setTimerID(0);
    setPlaying(false);
    setTimeLeft(timeConvert(props.taskArray[props.task].time * 60));
  }
  function finishTask(){
    if (timerID !== 0){
    clearInterval(timerID);
    props.setTimeFinished(timeLeft);
    props.updateSummaryArray({title: props.taskArray[props.task].title, time: timeLeft});
    console.log(tasksFinished);
    if (props.task === props.taskArray.length - 1){
    props.finishPlayPage(tasksFinished);
    }
    else{
      console.log('we will skip');
      skipTask();
    }
    } 
  }
  function skipTask(){
    props.setTimeLeftColor('black')
    setPlaying(false);
    if (props.task === props.taskArray.length-1){
      //there is nothing to skip, finish the routine, send to summary page
      props.setNothingNext(true);
    }
    else if (props.task === props.taskArray.length-2){
      //second to last
      let queue = props.task + 1;
      props.setTaskQueue(props.task+1);
      //skipCount+=1;
      props.setNothingNext(true);
      clearInterval(timerID);
      setTimerID(0);
      let startTime = props.taskArray[queue].time * 60;
      setTimeLeft(timeConvert(startTime));
    }
    else{
      let queue = props.task + 1;
      props.setTaskQueue(props.task+1);
      //skipCount+=1;
      props.setNextTask(props.nextTask+1);
      props.setNothingNext(false);
      clearInterval(timerID);
      setTimerID(0);
      console.log(props.task);
      let startTime = props.taskArray[queue].time * 60;
      setTimeLeft(timeConvert(startTime));
  }
}
  
  return (
    <div>
      <div className='play-div-titles'>
      <h1 className='play-h1'>{props.title}</h1>
      </div>
      <div className='play-div-time'>
      <h2 className='play-h2'>{props.taskArray[props.task].title}</h2>
        <h2 className='play-h2-time' style={{color: props.color}}>Time Left: {timeLeft} </h2>
        <h2 className='play-h2-time-total'>{props.taskArray[props.task].time} min</h2>
      </div>
      <div className='play-div-options'>
        {playing && <button className='play-button' onClick={resetTimer}><FontAwesomeIcon icon={faStop}/></button>}
        {!playing && <button className='play-button' onClick={startTimer}><FontAwesomeIcon icon={faPlay}/></button>}
        <button className='play-button' onClick={finishTask}><FontAwesomeIcon icon={faCheck}/></button>
      </div>
      <h2 className='play-h2-up-next'>Up next: {!props.nothingNext && props.taskArray[props.nextTask].title}</h2>
      <div className = 'play-div-bottom'> 
      <div className='play-div-button'>
        <button className='play-home-button' onClick={props.exitPlayPage}><FontAwesomeIcon icon={faHome}/></button>
        </div>
        <h2 className='play-h2-eta-time'>{props.estimatedTime}</h2>
        <h2 className='play-h2-eta'>Estimated end time</h2>
      </div>
      <hr className="divider"/> 
        <footer >© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
