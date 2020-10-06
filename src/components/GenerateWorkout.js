import React, {useContext} from "react"
import {Context} from '../context'
import ExerciseCard from './ExerciseCard'
import styled from '@emotion/styled'

const GenerateWorkout = () => {
  const {activeExercises, goal} = useContext(Context)

  return (
    <section>
      {activeExercises.map(ex => {
        console.log(ex)
        return <ExerciseCard name={ex.name} workload={ex[goal]}/>
      })}
    </section>
  )
}

export default GenerateWorkout

const MuscleName = styled.p`
  color: white;
`