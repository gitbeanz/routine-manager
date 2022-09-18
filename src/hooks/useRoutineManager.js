
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
    const [currentTotalTime, setTotalTime] = useState(0);
    const [routineOpened, setRoutineOpened] = useState("");
    const [routineSubtitle, setRoutineSubtitle] = useState("NEW");
    const [taskDeleteModal, showTaskDeleteModal] = useState(false);
    const [taskSelected, setSelectedTask] = useState('');
    const [playStatus, setPlayState] = useState(false);
    const [taskQueue, setTaskQueue] = useState(0);
    const [nextTask, setNext] = useState(0);
    const [nothingNext, setNothingNext] = useState(false);
    const [taskLength, setTaskLength] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const [timerID, setTimerID] = useState(0);
    const [paused, setPause] = useState(false);
    const [currentTimeLeft, setCurrentTimeLeft] = useState(0);
    const [timeLeftColor, setTimeLeftColor] = useState('black');
    const [routineColor, setRoutineColor] = useState('#FF2626');

    const handleCountClick = () => {
        //increments routine count and appends to routineArray
        console.log(currentRoutine);
        if (!routineArray.includes(currentRoutine) && currentRoutine.length !== 0){
        setCount(count + 1);
        setRoutineArray([...routineArray, currentRoutine]);
        makeRoutineData(currentRoutine, 0);
        }
        else if (routineArray.includes(currentRoutine)){
            setMessage('Whoops! You already have a routine with this name. Click anywhere to try again.')
            showModal(true);
        }
        else if (currentRoutine.length === 0){
            setMessage("Whoops! Don't leave your routine name blank. Click anywhere to try again.")
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
    const selectRoutineData = (title, time) => {
        //make new routine data, add to routine array
        setRoutineData(dataArray.find((element)=>{return element.title === title}));
    }
    const makeRoutineData = (title,time) =>{
        setDataArray([...dataArray, {title: title, time: time, taskData: []}]);
        console.log(dataArray);
    }
    const routineDelete = (id) => {
        setDataArray(dataArray.filter(element => {
            if (element.title !== id){
                console.log('DATA FOUND');
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
    const taskDelete = (id) =>{
        let deletedTaskTime = taskArray.find((element)=>{
            return element.title === id
        }).time
        setTotalTime(currentTotalTime - deletedTaskTime)
        setTaskArray(taskArray.filter(element=>{
            if (element.title !== id){
                return true;
            }
            else{
                return false;
            }
        }))
        setTaskCount(taskCount-1);
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
            setTaskCount(taskCount+1);
            let newTaskData = {title: currentTask, time: currentTime};
            setTaskArray([...taskArray, newTaskData]);
            return newTaskData;
    }
    const checkTaskValidity = (task, time, taskArray) =>{
        console.log(task);
        if (periodDetected(time)){
            showTaskModal(true);
            setAddModal(false);
            setTaskError('Whoops! Add an integer (no decimals). Click anywhere to try again.');
            return false;
        }
        else if (parseInt(time)<= 0){
            showTaskModal(true);
            setAddModal(false);
            setTaskError('Whoops! Add a positive integer. Click anywhere to try again.')
            return false;
        }
        else if (task.length === 0){
            showTaskModal(true);
            setAddModal(false);
            setTaskError("Whoops! Don't leave your task name blank. Click anywhere to try again.")
            return false;
        }
        else if (duplicateDetected(task, taskArray)){
            showTaskModal(true);
            setAddModal(false);
            setTaskError("Whoops! You already have a task with this name. Click anywhere to try again.")
            return false;
        }
        else if (time.length === 0){
            showTaskModal(true);
            setAddModal(false);
            setTaskError("Whoops! Don't leave your task minutes blank. Click anywhere to try again.")
            return false;
        }
        else{
            return true;
        }
    }
    function periodDetected(time){
        let returnValue = false;
        for (let i = 0; i < time.length; i++){
            if (time[i]==='.'){
                returnValue = true;
            }
        }
        return returnValue;
    }
    function duplicateDetected(task, taskArray){
        console.log('duplicate funct called: ', task);
        console.log(taskArray);
        let returnValue = false;
        for (let i = 0; i < taskArray.length; i++){
            console.log('HI');
            console.log(taskArray[i]);
            if (taskArray[i].title === task){
                console.log('duplicateFound');
                returnValue = true;
            }
        }
        return returnValue;
    }
    const homePageUpdate = (routineTitle, routineTotalTime, taskArray) =>{
        setDataArray(dataArray.map(element=>{
            if (element.title === routineTitle){
                return {title: routineTitle, time: routineTotalTime, taskArray: taskArray};
            }
            else{
                return element;
            }
        }))
    }

    const enterPlayPage = () =>{
        setPlayState(true);
    }
    const exitPlay = () =>{
        setPlayState(false);
        setHomeState(true);
    }
    const calculateEstimatedTime = () =>{
        let futureTime = new Date();
        futureTime.setMinutes(futureTime.getMinutes()+currentTotalTime);
        let futureTimeString = futureTime.toLocaleTimeString();
        let colonCount = 0;
        let newTimeString = '';
        for (let i = 0; i < futureTimeString.length; i++){

            if (futureTimeString[i] === ':'){
                colonCount += 1;
            }
            if (colonCount < 2){
                newTimeString += futureTimeString[i];
            }
            else{
                if ((futureTimeString[i] === 'A')||(futureTimeString[i] === 'M')||(futureTimeString[i] === 'P')||(futureTimeString[i] === ' ')){
                    newTimeString += futureTimeString[i];
                }
            }
        }
        setEstimatedTime(newTimeString);
    }

    return {routineColor, setRoutineColor, timeLeftColor, setTimeLeftColor, currentTimeLeft, setCurrentTimeLeft, paused, setPause, timerID, setTimerID, timeLeft, setTimeLeft, calculateEstimatedTime, estimatedTime, setEstimatedTime, setTaskLength, taskLength, nextTask, setNext, nothingNext, setNothingNext, taskQueue, setTaskQueue, exitPlay, playStatus, enterPlayPage, setTime, setTask, taskDelete, taskSelected, setSelectedTask, taskDeleteModal, showTaskDeleteModal, showTaskModal, checkTaskValidity, taskModal, taskError, setTaskCount, setTaskArray, dataArray, selectRoutineData, homePageUpdate, routineSubtitle, setRoutineSubtitle,routineOpened, setRoutineOpened, setTotalTime, currentTotalTime, taskCount, taskArray, addTask, count, handleCountClick, currentRoutine, handleRoutineName, routineArray, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, makeRoutineData, routineData, addModal, setAddModal, trashModal, setTrashModal, routineDelete, timeChange, currentTime, taskChange, currentTask};
}

export default useRoutineManager;