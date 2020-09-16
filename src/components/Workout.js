import React, {useContext} from "react"
import {Context} from '../context'
import styled from '@emotion/styled'

const Workout = () => {
  const {theme, step, muscles, equipment} = useContext(Context)

  return (
    <WorkoutResults className={`${theme}-theme ${step !== 'workout' && 'hide'}`}>
      <h2 className='heading'>Here's your workout!</h2>
      <p>Here are the muscles you selected:</p>
      <ul>
        {muscles.map(muscle => (
          <li>{muscle.toUpperCase()}</li>
        ))}
      </ul>
      <p>Here's the equipment you have access to</p>
      <ul>
        {equipment.map(e => (
          <li>{e.toUpperCase()}</li>
        ))}
      </ul>
    </WorkoutResults>
  )
}

export default Workout

const WorkoutResults = styled.section`

  &.dark-theme {
    * { color: white; }
  }
`