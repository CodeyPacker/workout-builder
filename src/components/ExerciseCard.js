import React, { useContext } from "react"
import styled from '@emotion/styled'
import {Context} from '../context'

const ExerciseCard = ({name, workload, exerciseNum, angle}) => {
  const { theme } = useContext(Context)
  return (
    <Card className={`${theme}-theme `}>
      <div className="card-header">
        <span className="exercise-number">{ exerciseNum + 1 }</span>
        <div className="card-details">
          <h3 className='name'>{name}</h3>
          <p className='angle'>{angle}</p>
        </div>
      </div>
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
    align-items: center;
    font-size: 20px;
    color: #fff;
    background-color: #1B0C69;
    font-weight: bold;
    padding: 15px;
    margin-bottom: -1px;
    border-top-left-radius: 4px;
  }

  .card-details {
    display: flex;
    flex-direction: column;
    padding: 5px 15px 5px 5px;
  }

  .name {
    display: flex;
    align-self: center;
    font-size: 23px;
    text-transform: capitalize;
  }

  .angle {
    margin-top: 5px;
    margin-bottom: 0;
    font-style: italic;
    text-transform: capitalize;
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
  }
`