import React, {useContext} from 'react';
import styled from '@emotion/styled'
import {Context} from './context'
import './styles/App.css';
import ThemeToggle from './components/ThemeToggle'
import Questions from './components/Questions'
import Workout from './components/Workout'
import GenerateWorkout from './components/GenerateWorkout'

const App = () => {
  const {theme} = useContext(Context)

  return (
    <AppWrapper className={`app ${theme}-theme `}>
      <header>
        <ThemeToggle/>
      </header>
      <Questions/>
      <Workout/>
      <GenerateWorkout/>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: #f4f4f4;
  transition: background-color .2s;
  padding: 0 0 15px;

  header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
    border-bottom: 2px solid #d4d4d4;
    padding-bottom: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, .22)
  }

  &.dark-theme {
    background-color: #121212;

    header {
      border-bottom: 2px solid #f4f4f4;
    }
  }
`