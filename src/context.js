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

  const shuffle = (arr) => {
    // Fisher - Yates shuffle | Shuffle exercises
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [
          arr[j],
          arr[i],
        ];
      }
  }

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

    shuffle(selectedExercises)

    setPossibleExercises(() => possibleExercises.concat(selectedExercises));
  };
  let targetedExercises = []

  if (beginWorkout) {
    console.log(possibleExercises);
    // for each muscle, find an exercise that hits each angle.
    let numOfExercises = muscles.length > 1 ? 8 : 6
    let totalAngles = null
    // Start filling the exercises in
    // add 1 exercise that'll hit each angle
        muscles.forEach(muscle => {
            if (muscles.length < 3) {
                let angles = exerciseLibrary[muscle].find(ex => {
                    return ex.angles
                })
                angles['angles'].forEach(a => {
                    totalAngles += 1
                    return targetedExercises.push(possibleExercises.find(ex => ex.angle === a ))
                })

            } else {
                targetedExercises.push(possibleExercises.find(ex => ex.muscle === muscle))
            }
        })
        // figure out how to use useState instead.
        // It infinite loops
        activeExercises = targetedExercises
  }
  console.log(activeExercises);
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
