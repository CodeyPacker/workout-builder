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
  const [activeExercises, setActiveExercises] = useState([]);
  const [combo, setCombo] = useState("");

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
      : setMuscles((prevMuscles) => prevMuscles.filter((e) => e !== selection));
  }

  const handleEquipment = (selection) => {
    // add the muscle names to the array
    !equipment.includes(selection)
      ? setEquipment((prevEquipment) => prevEquipment.concat(selection))
      : setEquipment((prevEquipment) =>
          prevEquipment.filter((e) => e !== selection)
        );
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

    // Fisher - Yates shuffle | Shuffle exercises
    for (let i = selectedExercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedExercises[i], selectedExercises[j]] = [
        selectedExercises[j],
        selectedExercises[i],
      ];
    }

    setPossibleExercises(() => possibleExercises.concat(selectedExercises));
  };

  // Prioritize combos
  // if (beginWorkout) {
  //     console.log(possibleExercises);
  //     if (muscles.includes('chest') && muscles.includes('triceps')) {
  //         console.log('looking for chest + tri combos');
  //         let numOfChestExercises = 0
  //         let chestExercises = []

  //     } else if (muscles.includes('back') && muscles.includes('biceps')) {
  //         console.log('looking for back and bicep combos');
  //     }
  // }

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
