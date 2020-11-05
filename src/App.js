import React, {useContext} from 'react';
import styled from '@emotion/styled'
import {Context} from './context'
import './styles/App.css';
import ThemeToggle from './components/ThemeToggle'
import Questions from './components/Questions'
import Workout from './components/Workout'
import DisplayWorkout from './components/DisplayWorkout'

const App = () => {
  const {theme} = useContext(Context)

  return (
    <AppWrapper className={`app ${theme}-theme `}>
      <header>
        <ThemeToggle/>
      </header>
      <Questions/>
      <Workout/>
      <DisplayWorkout/>
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
    justify-content: flex-start;
    padding: 10px 15px;
  }

  &.dark-theme {
    background-color: #27272c;
  }
`