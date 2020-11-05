import React, {useContext} from "react"
import {Context} from '../context'
import styled from '@emotion/styled'

const Workout = () => {
  const {theme, step} = useContext(Context)

  return (
    <WorkoutResults className={`${theme}-theme ${step !== 'workout' && 'hide'}`}/>
  )
}

export default Workout

const WorkoutResults = styled.section`

  &.dark-theme {
    * { color: white; }
  }
`