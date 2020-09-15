import React, {useContext} from "react"
import {ThemeContext} from '../themeContext'
import styled from '@emotion/styled'

const Questions = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <QuestionsWrapper className={`${theme}-theme `}>
      <div className='whats-your-goal'>
        <h2 className='heading center-text'>What's your goal?</h2>
        <div className='question-flex-container'>
          <button>Build Muscle</button>
          <button>Gain Strength</button>
        </div>
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

  &.dark-theme {
    .heading { color: #f4f4f4; }

    button {
      background-color: #1e1e1e;
      color: #f4f4f4;
      border-bottom: 3px solid #BB86FC;
    }
  }
`