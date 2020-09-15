import React, {useState} from "react"
const Context = React.createContext()

function ContextProvider(props) {
    const [theme, setTheme] = useState("light")
    const [goal, setGoal] = useState("")
    const [step, setStep] = useState(1)
    const [muscles, setMuscles] = useState([])
    const [workoutInProgress, setWorkoutStatus] = useState(false)

    function toggleTheme() {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    function handleGoal(selection) {
        setGoal(prevGoal => selection)
        setStep(prevStep => prevStep += 1)
        console.log(goal);
    }

    function handleMuscle(selection) {
        !muscles.includes(selection)
            ? setMuscles(prevMuscles => prevMuscles.concat(selection))
            : setMuscles(prevMuscles => prevMuscles.filter(e => e !== selection))
    }

    const beginWorkout = () => {
        setWorkoutStatus(prev => true)
        setStep(prevStep => prevStep += 1)
        console.table(muscles);
    }

    console.log(workoutInProgress);
    return (
        <Context.Provider value={{theme, toggleTheme, handleGoal, step, handleMuscle, beginWorkout}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
