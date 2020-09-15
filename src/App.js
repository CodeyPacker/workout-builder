import React, {useContext} from 'react';
import './App.css';
import styled from '@emotion/styled'
import {ThemeContext} from './themeContext'
import Button from './components/Button'
// import Header from './components/Header'

function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <AppWrapper className={`${theme}-theme `}>
      <header>
        <Button/>
      </header>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  transition: background-color .2s;

  &.dark-theme {
    background-color: #1e1e1e;
  }

  header {
    display: flex;
    justify-content: flex-end;
    padding: 20px 15px;
  }
`