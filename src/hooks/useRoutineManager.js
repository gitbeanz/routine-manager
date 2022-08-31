import { useState } from "react";

const useRoutineManager = () => {
    const [count, setCount] = useState(0);
    const [routineArray, setRoutineArray] = useState([]) //each routine is an object
    const [currentRoutine, setCurrentRoutine] = useState("");
    const [modal, showModal] = useState(false);
    const [errorMessage, setMessage] = useState('');

    const handleCountClick = () => {
        //increments routine count and appends to routineArray
        console.log(currentRoutine);
        if (!routineArray.includes(currentRoutine) && currentRoutine.length !== 0){
        setCount(count + 1);
        setRoutineArray([...routineArray, currentRoutine]);
        }
        else if (routineArray.includes(currentRoutine)){
            setMessage('Woops! You already have a routine with this name. Click anywhere to try again')
            showModal(true);
        }
        else if (currentRoutine.length === 0){
            setMessage("Woops! Don't leave your routine name blank. Click anywhere to try again")
            showModal(true);
        }
        setCurrentRoutine('');
    }

    const handleRoutineName = (routine) => {
        console.log('this now passed', routine);
        setCurrentRoutine(routine);
        return currentRoutine;
    }

    return { count, handleCountClick, currentRoutine, handleRoutineName, routineArray, modal, showModal, errorMessage};
}

export default useRoutineManager;