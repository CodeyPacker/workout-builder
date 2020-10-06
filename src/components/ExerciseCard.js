import React, { useContext } from "react"
import styled from '@emotion/styled'
import {Context} from '../context'

const ExerciseCard = ({name, workload}) => {
  const { theme } = useContext(Context)
  console.log(workload)
  return (
    <Card className={`${theme}-theme `}>
      <h3 className='name'>{name}</h3>
      <ul>
        {
          workload.map((rep, i) => {
            return (
              <li>Set {i + 1}: {rep} reps</li>
            )
          })
        }
      </ul>
    </Card>
  )
}

export default ExerciseCard
const Card = styled.section`
  padding: 15px;
  max-width: 400px;
  width: calc(100% - 15px);
  margin: 0 auto 20px;
  background-color: #fff;
  border-radius: 4px;

  .name {
    font-size: 23px;
    padding-bottom: 15px;
    border-bottom: 3px solid #41D3A2;
  }

  &.dark-theme {
    background-color: #1e1e1e;

    .name {
      color: #fff;
      border-bottom: 3px solid #BB86FC;
    }
  }
`