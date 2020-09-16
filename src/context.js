import React, {useState} from "react"
const Context = React.createContext()

function ContextProvider(props) {
    const [theme, setTheme] = useState("dark")
    const [goal, setGoal] = useState("")
    const [step, setStep] = useState('choose-goal')
    const [muscles, setMuscles] = useState([])
    const [workoutInProgress, setWorkoutStatus] = useState(false)
    const [equipment, setEquipment] = useState([])

    console.log(step);

    function toggleTheme() {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    function handleGoal(selection) {
        setGoal(prevGoal => selection)

        if (selection === 'muscle' || selection === 'strength' ) {
            setStep(prevStep => 'choose-muscles')
        } else {
            setStep(prevStep => 'lose-weight-equipment')
        }
    }

    function handleMuscle(selection) {
        // add the muscle names to the array
        !muscles.includes(selection)
            ? setMuscles(prevMuscles => prevMuscles.concat(selection))
            : setMuscles(prevMuscles => prevMuscles.filter(e => e !== selection))
    }

    const handleEquipment = (selection) => {
        // add the muscle names to the array
        !equipment.includes(selection)
            ? setEquipment(prevEquipment => prevEquipment.concat(selection))
            : setEquipment(prevEquipment => prevEquipment.filter(e => e !== selection))

        console.log('handleEquipment');
    }

    const beginWorkout = () => {
        if (equipment.length !== 0) {
            setWorkoutStatus(prev => true)
            setStep(prevStep => prevStep = 'workout')
        }
        console.log('Muscles:');
        console.table(muscles);
        console.log('Equipment:');
        console.table(equipment);
    }

    // make a more generic function for updating the step
    const submitMuscles = () => {
        muscles.length !== 0 && setStep(prevStep => prevStep = 'select-muscle-equipment')
    }

    return (
        <Context.Provider value={{theme, toggleTheme, handleGoal, step, muscles, handleMuscle, beginWorkout, submitMuscles, equipment, handleEquipment}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
