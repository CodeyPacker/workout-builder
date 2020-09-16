import React, {useContext} from "react"
import {Context} from '../context'
import styled from '@emotion/styled'
import heartLight from '../images/heart-light.svg'
import heartDark from '../images/heart-dark.svg'

const Questions = () => {
  const {theme, handleGoal, step, handleMuscle, submitMuscles, handleEquipment, beginWorkout} = useContext(Context)

  return (
    <QuestionsWrapper className={`${theme}-theme `}>
      <div className={`whats-your-goal ${step !== 'choose-goal' && 'hide'}`}>
        <h2 className='heading center-text'>What's your goal?</h2>
        <div className='question-flex-container'>
          <button onClick={() => handleGoal('muscle')}>Build Muscle</button>
          <button onClick={() => handleGoal('strength')}>Build Strength</button>
          <button onClick={() => handleGoal('lose-weight')}>Lose Weight</button>
        </div>
      </div>

      <div className={`multiple-choice ${step !== 'choose-muscles' ? 'hide' : ''}`}>
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
        <div className="begin-workout-wrapper">
          <button className="begin-workout" onClick={submitMuscles}>Choose equipment!</button>
        </div>
      </div>

      {/* Body building - Choose equipment */}
      <div className={`multiple-choice ${step !== 'select-muscle-equipment' ? 'hide' : ''}`}>
        <h2 className='heading center-text'>What equipment do you have access to?</h2>
        <form className='question-flex-container'>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleEquipment('gym')} id="gym"/>
          <label htmlFor="gym">Full gym</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleEquipment('dumbbells')} id="dumbbells"/>
          <label htmlFor="dumbbells">Dumbbells</label>
        </form>
        <div className="begin-workout-wrapper">
          <button className="begin-workout" onClick={beginWorkout}>Begin workout!</button>
        </div>
      </div>

      {/* Lose weight - Choose equipment */}
      <div className={`multiple-choice ${step !== 'lose-weight-equipment' ? 'hide' : ''}`}>
        <h2 className='heading center-text'>What equipment do you have access to?</h2>
        <form className='question-flex-container'>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleEquipment('jumprope')} id="jumprope"/>
          <label htmlFor="jumprope">Jump rope</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleEquipment('body-weight')} id="body-weight"/>
          <label htmlFor="body-weight">Body weight</label>
        </form>
        <div className="begin-workout-wrapper">
          <button className="begin-workout" onClick={beginWorkout}>Begin workout!</button>
        </div>
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

  .begin-workout-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .begin-workout {
    border-bottom: 3px solid #1B0C69;
    background-color: white;
  }

  .muscle-checkbox {
    appearance: none;
    margin: 0;
  }

  ${'' /* Initialize height at 0 to create a transition effect */}
  button,
  .muscle-checkbox + label {
    padding: 15px 20px;
    background-color: #41D3A2;
    color: #1B0C69;
    border: 0;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    margin: 0 15px 25px;

    @media only screen and (max-width: 600px) {
      width: calc(50% - 30px);
      display: inline-block;
    }

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

  .begin-workout {
    border-bottom: 3px solid #41D3A2;
  }
}
`