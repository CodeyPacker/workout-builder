import React, { useState } from "react";
import exerciseLibrary from "./data/exerciseLibrary.json";
// TODO: GET REMOVE EXERCISE TO WORK
const Context = React.createContext();

function ContextProvider(props) {
  const [theme, setTheme] = useState("dark");
  const [goal, setGoal] = useState("");
  const [step, setStep] = useState("choose-goal");
  const [muscles, setMuscles] = useState([]);
  const [beginWorkout, setBeginWorkout] = useState(false);
  const [equipment, setEquipment] = useState([]);
  let [possibleExercises, setPossibleExercises] = useState([]);
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

  let activeExercisesClone = [];
  let possibleExercisesClone = possibleExercises
  let numOfExercises = muscles.length > 1 ? 8 : 6;

  const removeExercise = (exerciseObj) => {
    possibleExercisesClone.filter((ex) => {
      return ex.name !== exerciseObj.name
    })
  }

  /**
   * returns an array of 1 exercise per angle, per muscle
   */
  const findAngleExercises = (muscle, angles) => {
    // determine if combo might be available || Tried using state
    let combo = false;

    if (muscles.includes("chest") && muscles.includes("triceps")) {
      combo = true;
    }

    // get exercise
    // TODO: avoid duplicates
    // TODO: add functionality to search for a combo
    let exercise = angles.map((angle) => {
      return possibleExercises.find((ex) => ex.muscle === muscle && ex.angle === angle);
    });
    
    return exercise;
    // return allExercises
  };
      

  /**
   * returns an array with each angle for the muscle selected
   */
  const findAngles = (muscle) => {
    let foundAngles = exerciseLibrary[muscle].find((ex) => ex.angles);
    return foundAngles.angles;
  };

  /**
   * returns an exercise object that matches the key and value passed in
   */
  const findSpecificExercise = (muscle, key, value) => {
    return possibleExercisesClone.find((ex) => {
      if (ex.muscle === muscle && ex[key] === value) {
        return ex;
      }
    });
  };

  const initialize = () => {
    /**
     * Start the workout creation
     */
    muscles.forEach((muscle, i) => {
      let angles = findAngles(muscle);
      let exercise = findAngleExercises(muscle, angles);
      let compound = findSpecificExercise(muscle, "compound", true);
      compound && activeExercisesClone.push(compound);
      exercise.forEach((ex) => {
        removeExercise(ex)
        return activeExercisesClone.push(ex)
      });
      // make a function that removes an exercise from possibleExercises
      // to run every time an exercise is added so no duplicates occur
      console.log(activeExercisesClone)
    });
  }

  if (beginWorkout && activeExercises.length < numOfExercises) { // start workout if questions are answered & there are enough exercises
    initialize()

    // add exercises until there are enough & remove the found exercise from the source of truth
    let muscleArrayPosition = 0;
    while (activeExercisesClone.length < numOfExercises) {
      let addedMuscle = findSpecificExercise(
        muscles[muscleArrayPosition],
        "muscle",
        muscles[muscleArrayPosition]
      );
      removeExercise(addedMuscle);
      activeExercisesClone.push(addedMuscle);
      muscleArrayPosition === muscles.length - 1
        ? (muscleArrayPosition = 0)
        : (muscleArrayPosition += 1);
    }
    console.log(
      `active: ${activeExercisesClone.length} - numOfExercises: ${numOfExercises}`
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
