import React, {useContext} from "react"
import {Context} from '../context'
import styled from '@emotion/styled'
import heartLight from '../images/heart-light.svg'
import heartDark from '../images/heart-dark.svg'

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
        <form className='question-flex-container'>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('biceps')} id="biceps"/>
          <label htmlFor="biceps">Biceps</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('triceps')} id="triceps"/>
          <label htmlFor="triceps">Triceps</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('shoulders')} id="shoulders"/>
          <label htmlFor="shoulders">Shoulders</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('chest')} id="chest"/>
          <label htmlFor="chest">Chest</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('back')} id="back"/>
          <label htmlFor="back">Back</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('legs')} id="legs"/>
          <label htmlFor="legs">Legs</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('abs')} id="abs"/>
          <label htmlFor="abs">Abs</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('cardio')} id="cardio"/>
          <label htmlFor="cardio">Cardio</label>
        </form>
        <div className="begin-workout">
          <button onClick={beginWorkout}>Begin workout!</button>
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

  .muscle-checkbox { appearance: none; }

  button,
  .muscle-checkbox + label {
    padding: 15px 20px;
    margin: 15px;
    background-color: #41D3A2;
    color: #1B0C69;
    border: 0;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    min-width: 250px;
    text-align: center;
  }

  ${'' /* Initialize height at 0 to create a transition effect */}
  .muscle-checkbox + label {
    &:after {
      content: '';
      height: 0;
      width: 0;
      transition: width .2s, height .2s;
    }
  }

  .muscle-checkbox:checked + label {
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
      transition: width .2s, height .2s;
      content: url('${heartLight}');
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
  }

  &.dark-theme {
    .heading { color: #f4f4f4; }

    button,
    .muscle-checkbox + label {
      background-color: #1e1e1e;
      color: #f4f4f4;
      border-bottom: 3px solid #BB86FC;
    }

  .muscle-checkbox:checked + label {
    &:after { content: url('${heartDark}'); }
  }
}
`