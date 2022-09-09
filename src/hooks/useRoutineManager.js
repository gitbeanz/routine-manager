
import { useState } from "react";

const useRoutineManager = () => {
    const [count, setCount] = useState(0);
    const [routineArray, setRoutineArray] = useState([]) //each routine is an object
    const [currentRoutine, setCurrentRoutine] = useState("");
    const [modal, showModal] = useState(false);
    const [errorMessage, setMessage] = useState('');
    const [homeStatus, setHomeState] = useState(true);
    const [ routineData, setRoutineData] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [trashModal, setTrashModal] = useState(false);
    const [currentTime, setTime] = useState(0);
    const [currentTask, setTask] = useState('');
    const [taskError, setTaskError] = useState('');
    const [taskModal, showTaskModal] = useState(false);
    const [taskCount, setTaskCount] = useState(0);
    const [taskArray, setTaskArray] = useState([]);

    const handleCountClick = () => {
        //increments routine count and appends to routineArray
        console.log(currentRoutine);
        if (!routineArray.includes(currentRoutine) && currentRoutine.length !== 0){
        setCount(count + 1);
        setRoutineArray([...routineArray, currentRoutine]);
        }
        else if (routineArray.includes(currentRoutine)){
            setMessage('Whoops! You already have a routine with this name. Click anywhere to try again')
            showModal(true);
        }
        else if (currentRoutine.length === 0){
            setMessage("Whoops! Don't leave your routine name blank. Click anywhere to try again")
            showModal(true);
        }
        setCurrentRoutine('');
    }

    const handleRoutineName = (routine) => {
        //console.log('this now passed', routine);
        setCurrentRoutine(routine);
        return currentRoutine;
    }
    const routinePageOpen = () =>{
        console.log('this clicked');
        setHomeState(false);
        console.log(homeStatus);
        return homeStatus;
    }
    const homePageOpen = () =>{
        setHomeState(true);
        console.log(homeStatus);
        return homeStatus;
    }
    const makeRoutineData = (title, time) => {
        //make new routine data, add to routine array
        setRoutineData({title: title, time: time, taskArray: []});
        setDataArray([...dataArray, routineData]);
    }
    const routineDelete = (id) => {
        setDataArray(dataArray.filter(element => {
            if (element.title !== id){
                console.log('found');
                return true;
            }
            else{
                return false;
            }
        }));
        setRoutineArray(routineArray.filter(element=>{
            if (element !== id){
                console.log('found');
                return true;
            }
            else{
                return false;
            }
        }))
        setCount(count -1);
        setHomeState(true);
    }
    const timeChange = (number)=>{
        console.log(number);
        console.log(typeof(number));
        if (number === ''){
            ;
        }
        else{
            setTime(number);
            console.log(currentTime);
            } 
        }
    const taskChange = (name)=>{
        setTask(name);
    }
    const addTask = () =>{
        //check if task name is within bounds (will figure out later)
        //check if minutes does not contain a period
        if (periodDetected()){
            showTaskModal(true);
            setTaskError('Whoops! Add an integer (no decimals)');
        }
        else{
            setTaskCount(taskCount+1);
            let newTaskData = {title: currentTask, time: currentTime};
            setTaskArray([...taskArray, newTaskData]);
            console.log(taskArray)
            
        }
    }
    function periodDetected(){
        let returnValue = false;
        for (let i = 0; i < currentTime.length; i++){
            if (currentTime[i]==='.'){
                returnValue = true;
            }
        }
        return returnValue;
    }

    return { taskCount, taskArray, addTask, count, handleCountClick, currentRoutine, handleRoutineName, routineArray, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, makeRoutineData, routineData, addModal, setAddModal, trashModal, setTrashModal, routineDelete, timeChange, currentTime, taskChange, currentTask};
}

export default useRoutineManager;