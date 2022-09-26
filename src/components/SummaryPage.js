import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Summary from './Summary';
export default function SummaryPage(props) {
    console.log('THIS LOADED');
    console.log(props.summaryArray);
    console.log(props.differenceArray);
    var summary = props.summaryArray.map((item,index)=><Summary key={item.title} title={item.title} difference={props.differenceArray[index].difference} color = {props.differenceArray[index].color} time = {props.taskArray[index].time}/>)
  return (
    <div>
        <h1 className='summary-h1'>{props.title}</h1>
        <h2 className='summary-h2'>{props.timeStarted}-{props.timeDone}</h2>
        <h2 className='summary-task-h2'> Task Summary</h2>
        <div className='summary-tasks'>
          {summary}
        </div>
        <h3 className='summary-h3'> Total Time: </h3>
        <div className='summary-bottom-div'>
        <button className='summary-home-button' onClick={props.exitSummaryPage}><FontAwesomeIcon icon={faHome}/></button>
        </div>
        <hr className="divider"/> 
        <footer >© 2022 Designed with &lt;3 By Brandon Gumayagay</footer>
    </div>
  )
}
