import React, { useContext } from "react"
import styled from '@emotion/styled'
import {Context} from '../context'

const ExerciseCard = ({name, workload, exerciseNum}) => {
  const { theme } = useContext(Context)
  console.log(workload)
  return (
    <Card className={`${theme}-theme `}>
      <div className="card-header">
        <span className="exercise-number">{ exerciseNum + 1 }</span>
        <h3 className='name'>{name}</h3>
      </div>
      <ul className="set-list">
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
  max-width: 400px;
  width: calc(100% - 15px);
  margin: 0 10px 30px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 10;

  .card-header {
    display: flex;
      border-bottom: 3px solid #1B0C69;
  }

  .exercise-number {
    display: flex;
    align-content: center;
    font-size: 20px;
    color: #fff;
    background-color: #1B0C69;
    font-weight: bold;
    padding: 15px;
    margin-bottom: -1px;
    border-top-left-radius: 4px;
  }

  .name {
    display: flex;
    align-self: center;
    font-size: 23px;
    padding-left: 15px;
  }

  &.dark-theme {
    background-color: #1e1e1e;

    .name {
      color: #fff;
    }

    .card-header {
      border-bottom: 3px solid #BB86FC;
    }

    .exercise-number {
      background-color: #BB86FC;
      color: #1e1e1e;
    }

    .set-list {
      color: #fff;
    }
  }
`