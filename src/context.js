import React, { useState } from "react"
import exerciseLibrary from "./data/exerciseLibrary.json"
const Context = React.createContext()

function ContextProvider(props) {
  const [theme, setTheme] = useState("dark")
  const [goal, setGoal] = useState("")
  const [step, setStep] = useState("choose-goal")
  const [muscles, setMuscles] = useState([])
  const [beginWorkout, setBeginWorkout] = useState(false)
  const [equipment, setEquipment] = useState([])
  let [possibleExercises, setPossibleExercises] = useState([])
  let [activeExercises, setActiveExercises] = useState([])
  let angles = null;

  // possibleExercises holds all of the available exercises to choose from based on
  // selected muscles and available equipment

  // activeExercises is displayed on the page

  // activeExercisesClone was made to stop everything from re-rendering

  // TODO's:
  // Add the combo and compound search back in
  // Add "exercise swap"

  const toggleTheme = () => setTheme((prevTheme) => ( prevTheme === "light" ? "dark" : "light" ))

  const submitMuscles = () => {
    muscles.length !== 0 &&
      setStep((prevStep) => (prevStep = "select-muscle-equipment"))
  }

  const shuffle = (arr) => {
    // Fisher - Yates shuffle | Shuffle exercises
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  function handleGoal(selection) {
    setGoal((prevGoal) => selection)

    if ( selection === "hypertrophy" || selection === "strength" ) {
      setStep((prevStep) => "choose-muscles")
    } else {
      setStep((prevStep) => "lose-weight-equipment")
    }
  }

  function handleMuscle(selection) {
    // add the muscle names to the array
    !muscles.includes(selection)
      ? setMuscles((prevMuscles) => prevMuscles.concat(selection))
      : setMuscles((prevMuscles) => prevMuscles.filter((e) => e !== selection))
  }

  const handleEquipment = (selection) => {
    // add the muscle names to the array
    !equipment.includes(selection)
      ? setEquipment((prevEquipment) => prevEquipment.concat(selection))
      : setEquipment((prevEquipment) => prevEquipment.filter((e) => e !== selection))
  }

  const checkCompatibleEquip = (compatibleEquipment) => equipment.some(r=> compatibleEquipment.indexOf(r) >= 0)

    /**
   * returns an array with each angle for the muscle selected
   */
  const findAngles = (muscle) => {
    let foundAngles = exerciseLibrary[muscle].find((ex) => ex.angles)
    angles = foundAngles.angles
  }

  /**
   * returns an exercise object that matches the key and value passed in
   */
  const findSpecificExercise = (muscle, key, value) => {
    return possibleExercises.find((ex) => ex.muscle === muscle && ex[key] === value && checkCompatibleEquip(ex.equipment) )
  }

  // Initializes workout => beginWorkout = true
  // Fills selectedExercises based on muscle and equipment selection
  const handleBeginWorkout = () => {
    if ( equipment.length !== 0 ) {
      setBeginWorkout((prev) => true)
      setStep((prevStep) => (prevStep = "workout"))
    }

    // this gets moved into state after filled
    // GRABS ALL POSSIBLE EXERCISES BASED ON MUSCLE
    let selectedExercises = []

    // fill selectedExercises - checking exercise.name so the angles object doesn't get included
    // TODO: remove the angles from possibleExercises so this check isn't needed
    muscles.map(muscle => exerciseLibrary[muscle].map(exercise => exercise.name && selectedExercises.push(exercise)))

    shuffle(selectedExercises)

    setPossibleExercises(() => possibleExercises.concat(selectedExercises))
  }

  let activeExercisesClone = []
  let numOfExercises = muscles.length > 1 ? 8 : 6

  const removeExercise = (exerciseObj) => {
    possibleExercises.forEach((ex, i) => {
      if ( ex.name === exerciseObj.name ) {
        possibleExercises.splice(i, 1)
        return
      }
    })
  }

  /**
   * returns an array of 1 exercise per angle, per muscle
   */
  const findAngleExercises = (muscle, angles) => {
    // determine if combo might be available || Tried using state
    let combo = false

    if ( muscles.includes("chest") && muscles.includes("triceps") ) {
      combo = true
    }

    // get exercise
    let foundExercise = angles.map(angle => {
      let selectedExercise = null

      if ( combo ) {
        return selectedExercise = possibleExercises.find(ex => ex.muscle === muscle && ex.angle === angle && ex.combo && checkCompatibleEquip(ex.equipment))
      }

      if ( !selectedExercise ) {
        return selectedExercise = possibleExercises.find(ex => ex.muscle === muscle && ex.angle === angle && checkCompatibleEquip(ex.equipment))
      }

      return null
    })

    return foundExercise
  }

  const initialize = () => {
    /**
   * Start the workout creation
   */
    muscles.forEach((muscle, i) => { // muscles = ['chest', 'triceps']
      findAngles(muscle)
      let exercise = findAngleExercises(muscle, angles)
      // TODO: get compound exercises working
      // let compound = findSpecificExercise(muscle, "compound", true); // start out with a compound exercise
      // removeExercise(compound)
      exercise.forEach((ex) => {
        // ex.compound === true ? activeExercisesClone.unshift(ex) : activeExercisesClone.push(ex)
        if ( ex.compound && checkCompatibleEquip(ex.equipment) ) {
          activeExercisesClone.unshift(ex)
        } else {
          activeExercisesClone.push(ex)
        }
        removeExercise(ex)
      })
    })

    let muscleArrayPosition = 0;
    while ( activeExercisesClone.length < numOfExercises ) {
      let addedMuscle = findSpecificExercise(
        muscles[muscleArrayPosition],
        "muscle",
        muscles[muscleArrayPosition]
      )
      removeExercise(addedMuscle)
      activeExercisesClone.push(addedMuscle)
      muscleArrayPosition === muscles.length - 1
        ? (muscleArrayPosition = 0)
        : (muscleArrayPosition += 1)
    }
  }

  if ( beginWorkout && activeExercises.length < numOfExercises ) { // start workout if questions are answered & there are enough exercises
    setBeginWorkout((prev) => false) // prevent from running multiple times
    initialize()

    // move to own function
    let sortedByCategory = []
    let categories = []

    // fill categories
    activeExercisesClone.map((item, i) => {
      !categories.includes(item.category) && categories.push(item.category)
      return null
    })

    // add categories back into an array
    categories.map(category => {
      activeExercisesClone.forEach((item, i) => item.category === category && sortedByCategory.push(item))
      return null
    })

    console.log(categories);
    setActiveExercises(() => activeExercises.concat(sortedByCategory))
  }

  return (
    <Context.Provider
      value={{
        goal,
        beginWorkout,
        possibleExercises,
        setPossibleExercises,
        activeExercises,
        theme,
        toggleTheme,
        handleGoal,
        step,
        muscles,
        handleMuscle,
        handleBeginWorkout,
        submitMuscles,
        equipment,
        handleEquipment,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
