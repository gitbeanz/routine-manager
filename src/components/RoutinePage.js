import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import useRoutineManager from '../hooks/useRoutineManager'
import Add from './Add'
import Error from './Error'
import Trash from './Trash'
import Task from './Task'
export default function RoutinePage(props) {
  const {taskCount, taskArray, taskChange, timeChange, trashModal, setTrashModal, addModal, setAddModal, modal, showModal, addTask } = useRoutineManager();
  var errorMessage = "Whoops! You can't start a routine without adding a task. Click anywhere to try again"
  function handleAdd(){
    setAddModal(true);
  }
  function handleTrash(){
    setTrashModal(true);
  }
  function cancelTask(){
    setAddModal(false);
  }
  function handleErrorClick(){
    showModal(false);
  }
  function handleStart(){
    showModal(true);
  }
  function cancelDelete(){
    setTrashModal(false);
  }
  function confirmDelete(){
    props.deleteFunct(props.title);
  }
  function handleTimeChange(event){
    if (event.target.value.length > 2){
      //console.log('too long');
      event.target.value = event.target.value.slice(0,2);
    }
    ;
    timeChange(event.target.value);
  }
  function handleTaskChange(event){
    taskChange(event.target.value);
  }
  function handleAddTask(){
    let taskData = addTask();
    console.log(taskArray);
    props.timeSet(props.totalTime+parseInt(taskData.time));
    setAddModal(false);
  }
  //console.log(typeof(taskArray));
  var renderedTasks = taskArray.map(item => <Task title={item.title} subtitle={item.time} routineClass='new' key={item.title}/>);
  return (
    <div>
      {addModal && <Add addFunct={handleAddTask}changeFunct={handleTaskChange} changeFunctTime={handleTimeChange} cancelFunct={cancelTask}/>}
      {modal && <Error  clickFunct={handleErrorClick}errorText={errorMessage} />}
      {trashModal && <Trash deleteFunct={confirmDelete}cancelFunct={cancelDelete}/>}
    <div className='routine-div'>
        <h1 className='routine-title'>{props.title}</h1>
        <button className='routine-home-button'onClick={props.clickFunct}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
        <h2 className='routine-subtitle'>{props.totalTime} minutes</h2>
        <h2 className='routine-task-title'>My Tasks ({taskCount})</h2>
    </div>
    <div className='routine-task-section'>
      {renderedTasks}
    </div>
    <div className='routine-task-options'><button className='routine-button' onClick={handleAdd}><FontAwesomeIcon icon={faAdd}></FontAwesomeIcon></button><button className='routine-start-button' onClick={handleStart}>Start</button><button onClick={handleTrash} className='routine-button'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></div>
    <hr className="divider"/> 
        <footer >© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
