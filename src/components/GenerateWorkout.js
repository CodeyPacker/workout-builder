import React, {useContext} from "react"
import {Context} from '../context'
import exerciseLibrary from '../data/exerciseLibrary.json'
import styled from '@emotion/styled'

const GenerateWorkout = () => {
  const {muscles, beginWorkout, possibleExercises, setPossibleExercises} = useContext(Context)

  // Things to consider:
  // - filter out all exercises based on the muscles
  // - 1 muscle = 6 exercises
  // - 2 muscles = 8 exercises (4 each)
  // - priorities combos if muscles contains
  //     - chest, triceps
  //     - back, biceps

  // let selectedExercises = [];
  // if (muscles.length > 0 && beginWorkout) {
  //   muscles.forEach(muscle => {
  //     // loop over exercise library
  //     console.log(muscle);
  //     exerciseLibrary[muscle].forEach(m => (
  //       selectedExercises.push(m)
  //     ))
  //   })
  // }

  // setPossibleExercises(ex => ex.concat(selectedExercises))

  // console.log(selectedExercises);
  // const selections = exerciseLibrary["chest"].filter(e => {
  //  if (e.combo) {
  //    if (e.combo.includes("chest") && e.combo.includes("triceps"))
  //       console.log(e);
  //  }
  // })

  console.log(possibleExercises);

  return (
    <section>
      <h2>Test</h2>
      {possibleExercises.map(muscle => (
        <MuscleName>{muscle.name}</MuscleName>
      ))}
    </section>
  )
}

export default GenerateWorkout

const MuscleName = styled.p`
  color: white;
`