import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import useRoutineManager from '../hooks/useRoutineManager'
import Add from './Add'
export default function RoutinePage(props) {
  const {addModal, setAddModal } = useRoutineManager();
  function handleAdd(){
    setAddModal(true);
  }
  function cancelTask(){
    setAddModal(false);
  }
  return (
    <div>
      {addModal && <Add cancelFunct={cancelTask}/>}
    <div className='routine-div'>
        <h1 className='routine-title'>{props.title}</h1>
        <button className='routine-home-button'onClick={props.clickFunct}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
        <h2 className='routine-subtitle'>{props.time} minutes</h2>
        <h2 className='routine-task-title'>My Tasks (0)</h2>
    </div>
    <div className='routine-task-section'></div>
    <div className='routine-task-options'><button className='routine-button' onClick={handleAdd}><FontAwesomeIcon icon={faAdd}></FontAwesomeIcon></button><button className='routine-start-button'>Start</button><button className='routine-button'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></div>
    <hr className="divider"/>
        <footer>© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
