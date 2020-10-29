import React, {useContext} from "react"
import {Context} from '../context'
import ExerciseCard from './ExerciseCard'
import styled from '@emotion/styled'

const GenerateWorkout = () => {
  const {activeExercises, goal} = useContext(Context)

  return (
    <Exercises>
      {activeExercises.map((ex, i) => {
        console.log(ex)
        return <ExerciseCard name={ex.name} workload={ex[goal]} exerciseNum={i} angle={ex.angle} />
      })}
    </Exercises>
  )
}

export default GenerateWorkout

const Exercises = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`