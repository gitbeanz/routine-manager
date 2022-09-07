import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import useRoutineManager from '../hooks/useRoutineManager'
import Add from './Add'
import Error from './Error'
import Trash from './Trash'
export default function RoutinePage(props) {
  const {timeChange, trashModal, setTrashModal, addModal, setAddModal, modal, showModal } = useRoutineManager();
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
  function handleChange(event){
    console.log(event.target.value);
  }
  function handleTimeChange(event){
    
    if ((event.target.value.length === 1)&&((event.target.value !== '0')||(event.target.value !== '1')||(event.target.valee !== '2')||(event.target.value !== '3')||(event.target.value !== '4')||(event.target.value !== '5')||(event.target.value !== '6')||(event.target.value !== '7')||(event.target.value !== '8')||(event.target.value !== '9'))){
      console.log('hi');
    }
    if (event.target.value.length > 2){
      //console.log('too long');
      event.target.value = event.target.value.slice(0,2);
    }
    ;
    timeChange(event.target.value);
  }
  return (
    <div>
      {addModal && <Add changeFunct={handleChange} changeFunctTime={handleTimeChange} cancelFunct={cancelTask}/>}
      {modal && <Error  clickFunct={handleErrorClick}errorText={errorMessage} />}
      {trashModal && <Trash deleteFunct={confirmDelete}cancelFunct={cancelDelete}/>}
    <div className='routine-div'>
        <h1 className='routine-title'>{props.title}</h1>
        <button className='routine-home-button'onClick={props.clickFunct}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
        <h2 className='routine-subtitle'>{props.time} minutes</h2>
        <h2 className='routine-task-title'>My Tasks (0)</h2>
    </div>
    <div className='routine-task-section'></div>
    <div className='routine-task-options'><button className='routine-button' onClick={handleAdd}><FontAwesomeIcon icon={faAdd}></FontAwesomeIcon></button><button className='routine-start-button' onClick={handleStart}>Start</button><button onClick={handleTrash} className='routine-button'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></div>
    <hr className="divider"/>
        <footer>© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
