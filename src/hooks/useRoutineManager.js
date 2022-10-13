
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
    const [playing, setPlaying] = useState(false);
    const [currentTimeLeft, setCurrentTimeLeft] = useState(0);
    const [timeLeftColor, setTimeLeftColor] = useState('black');
    const [routineColor, setRoutineColor] = useState('#FF2626');
    const [completedTaskArray, setCompletedTaskArray] = useState([]);
    const [summaryStatus, setSummaryState] = useState(false);
    const [timeFinished, setTimeFinished] = useState({});
    const [summaryArray, setSummaryArray] = useState([]);
    const [timeStarted, setTimeStarted] = useState('');
    const [timeDone, setTimeDone] = useState('');
    const [differenceArray, setDifferenceArray] = useState([]);

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
        }
        ));
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
        window.localStorage.setItem('dataArray', dataArray);
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
        window.localStorage.setItem('dataArray', dataArray);
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
    const calculateCurrentTime = (start) =>{
        let currentTime = new Date();
        let currentTimeString = currentTime.toLocaleTimeString();
        let colonCount = 0;
        let newCurrentTimeString = '';
        for (let i = 0; i < currentTimeString.length; i++){
            if (currentTimeString[i] === ':'){
                colonCount += 1;
            }
            if (colonCount < 2){
                newCurrentTimeString += currentTimeString[i];
            }
            else{
                if ((currentTimeString[i] === 'A')||(currentTimeString[i] === 'M')||(currentTimeString[i] === 'P')||(currentTimeString[i] === ' ')){
                    newCurrentTimeString += currentTimeString[i];
                }
            }
        }
        if (start){
        setTimeStarted(newCurrentTimeString);
        }
        else{
            setTimeDone(newCurrentTimeString);
        }
    }
    const createSuccessArray = () =>{
        setCompletedTaskArray(taskArray.forEach((element)=>{
            console.log(element);
            let completeTask = {title: element.title, time: element.time, completed: false, timeCompleted: 0};
            console.log(completeTask);
            return completeTask;
        }))
        console.log('THIS CALLED');
        
    }
    function exitPlayPage(){
        setHomeState(true);
        setPlayState(false);
        setTimeLeftColor('black');
      }
      function exitSummaryPage(){
        setHomeState(true);
        setSummaryState(false);
      }
      function finishPlayPage(){
        setSummaryState(true);
        setPlayState(false);
      }
      function updateSummaryArray(element){
        setSummaryArray([...summaryArray, element]);
        let returnString = '';
        let returnColor = 'black';

        if (element.time === '00:00:00'){

            return returnString;
        }
        else{
            if (element.time[0] === '-'){
                //user has gone over
                returnColor = '#FF2626';
                returnString = '(+';
                let colonCount = 0;
                let hourString = '';
                let minutes = 0;
                let seconds = 0;
                let minuteString = '';
                let secondString = '';

                for (let i = 0; i < element.time.length; i++){
                    if (element.time[i]===':'){
                        colonCount += 1;
                    }
                    if (colonCount === 0 && element.time[i] !== ':'){
                        //make hourString
                        hourString += element.time[i]
                    }
                    if (colonCount === 1 && element.time[i] !== ':'){
                        //convert hours into minutes while also making minuteString
                        if (minuteString === ''){
                            minutes += (parseInt(hourString)* 60);

                        }
                        minuteString += element.time[i];
                }
                if (colonCount === 2 && element.time[i] !== ':'){
                    if (secondString === ''){
                        minutes += (parseInt(minuteString));

                    }
                    secondString += element.time[i];
                }
            }

            seconds += parseInt(secondString);
            returnString += (minutes.toString() + ' min ' + seconds.toString() + ' sec)');
          }
          else{
            returnColor = '#3070EB';
            console.log('this path chosen');
            returnString += '(-'
            let colonCount = 0;
            let hourString = '';
            let minuteString = '';
            let secondString = '';
            let totalFinishedSeconds = 0;
            for (let i = 0; i < element.time.length; i++){
                if (element.time[i]===':'){
                    colonCount+= 1;
                }
                if (colonCount === 0){
                    hourString += element.time[i];
                }
                if (colonCount === 1 && element.time[i] !== ':'){
                    if (minuteString === ''){
                        //convert hours to seconds
                        console.log(hourString);
                        totalFinishedSeconds += (parseInt(hourString)* 3600); 

                        console.log(totalFinishedSeconds);
                    }
                    minuteString += element.time[i];
                }
                if (colonCount === 2 && element.time[i] !== ':'){
                    if (secondString === ''){
                        console.log(minuteString);
                        totalFinishedSeconds += (parseInt(minuteString) * 60);
                        console.log(totalFinishedSeconds);
                    }
                    secondString += element.time[i];
                }
            }
            totalFinishedSeconds += parseInt(secondString);
            //find the difference between task seconds and total seconds
            let difference = 0;

            for (let i = 0; i < taskArray.length; i++){
                if (taskArray[i].title === element.title){
                    difference = timeConvert((taskArray[i].time * 60)-totalFinishedSeconds);
                }
            };
            let colonCount2 = 0;
            let hourString2 = '';
            let minutes2 = 0;
            let seconds2 = 0;
            let minuteString2 = '';
            let secondString2 = '';
            for (let i = 0; i < difference.length; i++){
                if (difference[i]===':'){
                    colonCount2 += 1;
                }
                if (colonCount2 === 0 && difference[i] !== ':'){
                    //make hourString
                    hourString2 += difference[i]
                }
                if (colonCount2 === 1 && difference[i] !== ':'){
                    //convert hours into minutes while also making minuteString
                    if (minuteString2 === ''){
                        minutes2 += (parseInt(hourString2)* 60);


                    }
                    minuteString2 += difference[i];
            }
            if (colonCount2 === 2 && difference[i] !== ':'){
                if (secondString2 === ''){
                    minutes2 += (parseInt(minuteString2));

                }
                secondString2 += difference[i];
            }
        }
        seconds2 += parseInt(secondString2);

            returnString += (minutes2.toString() + ' min ' + seconds2.toString() + ' sec)')
        }
        }

        console.log(returnString);


        setDifferenceArray([...differenceArray, {color: returnColor,difference: returnString}]);
      }
     
      function timeConvert(seconds){
        let timeString = '';
        let timeMinutes= '';
        let timeHours = '';
        let timeSeconds = '';
        let isNegative = false;
        if (seconds < 0){
          isNegative = true;
          seconds *= -1;
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
    return { setDataArray, setDifferenceArray, differenceArray, timeDone, calculateCurrentTime, timeStarted, setTimeStarted, exitSummaryPage, setSummaryArray, finishPlayPage, summaryArray, updateSummaryArray, exitPlayPage, timeFinished, setTimeFinished, summaryStatus, setSummaryState, createSuccessArray, completedTaskArray, setCompletedTaskArray, routineColor, setRoutineColor, timeLeftColor, setTimeLeftColor, currentTimeLeft, setCurrentTimeLeft, playing, setPlaying, timerID, setTimerID, timeLeft, setTimeLeft, calculateEstimatedTime, estimatedTime, setEstimatedTime, setTaskLength, taskLength, nextTask, setNext, nothingNext, setNothingNext, taskQueue, setTaskQueue, exitPlay, playStatus, enterPlayPage, setTime, setTask, taskDelete, taskSelected, setSelectedTask, taskDeleteModal, showTaskDeleteModal, showTaskModal, checkTaskValidity, taskModal, taskError, setTaskCount, setTaskArray, dataArray, selectRoutineData, homePageUpdate, routineSubtitle, setRoutineSubtitle,routineOpened, setRoutineOpened, setTotalTime, currentTotalTime, taskCount, taskArray, addTask, count, handleCountClick, currentRoutine, handleRoutineName, routineArray, modal, showModal, errorMessage, homeStatus, routinePageOpen, homePageOpen, makeRoutineData, routineData, addModal, setAddModal, trashModal, setTrashModal, routineDelete, timeChange, currentTime, taskChange, currentTask};
}

export default useRoutineManager;