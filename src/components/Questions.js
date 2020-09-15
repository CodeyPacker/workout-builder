import React, {useContext} from "react"
import {Context} from '../context'
import styled from '@emotion/styled'

const Questions = () => {
  const {theme, handleGoal, step, handleMuscle, beginWorkout} = useContext(Context)

  return (
    <QuestionsWrapper className={`${theme}-theme `}>
      <div className={`whats-your-goal ${step !== 1 && 'hide'}`}>
        <h2 className='heading center-text'>What's your goal?</h2>
        <div className='question-flex-container'>
          <button onClick={() => handleGoal('muscle')}>Build Muscle</button>
          <button onClick={() => handleGoal('strength')}>Gain Strength</button>
        </div>
      </div>
      <div className={`what-muscles ${step !== 2 && 'hide'}`}>
        <h2 className='heading center-text'>What muscles?</h2>
        <div className='question-flex-container'>
          <button onClick={() => handleMuscle('biceps')}>Biceps</button>
          <button onClick={() => handleMuscle('triceps')}>Triceps</button>
          <button onClick={() => handleMuscle('shoulders')}>Shoulders</button>
          <button onClick={() => handleMuscle('chest')}>Chest</button>
          <button onClick={() => handleMuscle('back')}>Back</button>
          <button onClick={() => handleMuscle('legs')}>Legs</button>
          <button onClick={() => handleMuscle('abs')}>Abs</button>
          <div className="begin-workout">
            <button onClick={beginWorkout}>Begin workout!</button>
          </div>
        </div>
      </div>
      <div className={`${step !== 3 && 'hide'}`}>
        <h2>Here's your workout!</h2>
      </div>
    </QuestionsWrapper>
  )
}

export default Questions

const QuestionsWrapper = styled.div`
  button {
    padding: 15px 20px;
    margin: 15px;
    background-color: white;
    border: 0;
    font-weight: 600;
    border-bottom: 3px solid #631BEE;
    cursor: pointer;
    min-width: 250px;
  }

  .question-flex-container {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .begin-workout {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &.dark-theme {
    .heading { color: #f4f4f4; }

    button {
      background-color: #1e1e1e;
      color: #f4f4f4;
      border-bottom: 3px solid #BB86FC;
    }
  }
`