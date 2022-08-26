import { useState } from "react";

const useRoutineManager = () => {
    const [count, setCount] = useState(0);
    const [routineArray, setRoutineArray] = useState([]) //each routine is an object
    const [currentRoutine, setCurrentRoutine] = useState("");

    const handleCountClick = () => {
        //increments routine count and appends to routineArray
        if (!routineArray.includes(currentRoutine)){
        setCount(count + 1);
        setRoutineArray([...routineArray, currentRoutine]);
        }
    }

    const handleRoutineName = (routine) => {
        //console.log('this now passed', routine);
        setCurrentRoutine(routine);
        return currentRoutine;
    }

    return { count, handleCountClick, currentRoutine, handleRoutineName, routineArray };
}

export default useRoutineManager;