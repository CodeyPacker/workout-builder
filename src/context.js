import React, {useState} from "react"
const Context = React.createContext()

function ContextProvider(props) {
    const [theme, setTheme] = useState("light")
    const [goal, setGoal] = useState("")

    function toggleTheme() {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    function handleGoal(selection) {
        setGoal(prevGoal => selection)
        console.log(`Previous goal: ${goal}`);
    }

    return (
        <Context.Provider value={{theme, toggleTheme, handleGoal}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
