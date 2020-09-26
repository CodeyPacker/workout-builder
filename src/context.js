import React, { useState } from "react";
import exerciseLibrary from "./data/exerciseLibrary.json";

const Context = React.createContext();

function ContextProvider(props) {
  const [theme, setTheme] = useState("dark");
  const [goal, setGoal] = useState("");
  const [step, setStep] = useState("choose-goal");
  const [muscles, setMuscles] = useState([]);
  const [beginWorkout, setBeginWorkout] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const [possibleExercises, setPossibleExercises] = useState([]);
  let [activeExercises, setActiveExercises] = useState([]);
  // const [combo, setCombo] = useState(false);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  function handleGoal(selection) {
    setGoal((prevGoal) => selection);

    if (selection === "muscle" || selection === "strength") {
      setStep((prevStep) => "choose-muscles");
    } else {
      setStep((prevStep) => "lose-weight-equipment");
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
      : setEquipment((prevEquipment) =>
          prevEquipment.filter((e) => e !== selection)
        );
  };

  const shuffle = (arr) => {
    // Fisher - Yates shuffle | Shuffle exercises
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  // Initializes workout => beginWorkout = true
  // Fills selectedExercises based on muscle and equipment selection
  const handleBeginWorkout = () => {
    if (equipment.length !== 0) {
      setBeginWorkout((prev) => true);
      setStep((prevStep) => (prevStep = "workout"));
    }

    // this gets moved into state after filled
    let selectedExercises = [];

    muscles.map((muscle) => {
      exerciseLibrary[muscle].map((exercise) => {
        if (exercise.name) {
          if (equipment.includes("gym")) {
            // include all exercises
            selectedExercises.push(exercise);
          } else {
            // only add if compatible with users equipment
            equipment.map((equip) => {
              equip in exercise.equipment && selectedExercises.push(exercise);
            });
          }
        }
      });
    });

    shuffle(selectedExercises);

    setPossibleExercises(() => possibleExercises.concat(selectedExercises));
  };

  let targetedExercises = [];
  let possibleExercisesClone = possibleExercises

  let numOfExercises = muscles.length > 1 ? 8 : 6;
  let maxExercises = numOfExercises === 8 ? 4 : 6

  if (beginWorkout && activeExercises.length < numOfExercises) {

    const findAngleExercises = (muscle, angles) => {
      // determine if combo might be available || Tried using state
      let combo = false

      if (muscles.includes('chest') && muscles.includes('triceps')) { combo = true }

      // get exercise
      let exercise = angles.map(angle => {
        return possibleExercises.find(ex => {
          if (combo) {
            // try searching for a combo
            return ex.muscle === muscle && ex.angle === angle
          } else { return ex.muscle === muscle && ex.angle === angle }
        })
      })

      return exercise
      // return allExercises
    }

    const findAngles = (muscle) => {
      let foundAngles = exerciseLibrary[muscle].find((ex) => ex.angles);
      return foundAngles.angles
    }

    const findSpecificExercise = (muscle, key, value) => {
      return possibleExercises[muscle].find(ex => ex[key] === value)
    }

    let testAllExercises = []

    muscles.forEach((muscle, i) => {
      let angles = findAngles(muscle)
      let exercise = findAngleExercises(muscle, angles)
      let compound = findSpecificExercise(muscle, 'compound', true)
      compound && testAllExercises.push(compound)

      exercise.forEach(ex => testAllExercises.push(ex))
      console.log(testAllExercises)

      // make a function that will fill in the rest of the exercises
      // and a failsafe if too many are added

      // make a function that removes an exercise from possibleExercises
      // to run everytime an exercise is added so no duplicates occur
    })

    console.log(
      `active: ${targetedExercises.length} - numOfExercises: ${numOfExercises}`
    );
  }

  // make a more generic function for updating the step
  const submitMuscles = () => {
    muscles.length !== 0 &&
      setStep((prevStep) => (prevStep = "select-muscle-equipment"));
  };

  return (
    <Context.Provider
      value={{
        beginWorkout,
        possibleExercises,
        setPossibleExercises,
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
  );
}

export { ContextProvider, Context };
