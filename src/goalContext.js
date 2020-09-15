import React, {useState} from "react"
const GoalContext = React.createContext()

function GoalContextProvider(props) {
    const [goal, setGoal] = useState("")

    function handleGoal() {
      setGoal(prevGoal => prevGoal === goal)
      console.log(goal);
    }

    return (
        <GoalContext.Provider value={{goal, handleGoal}}>
            {props.children}
        </GoalContext.Provider>
    )
}

export {GoalContextProvider, GoalContext}
