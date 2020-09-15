import React, {useContext} from 'react';
import styled from '@emotion/styled'
import {ThemeContext} from './themeContext'
import ThemeToggle from './components/ThemeToggle'

const App = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <AppWrapper className={`${theme}-theme `}>
      <header>
        <ThemeToggle/>
      </header>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: #e1e1e1;
  transition: background-color .2s;

  &.dark-theme { background-color: #1e1e1e; }

  header {
    display: flex;
    justify-content: flex-end;
    padding: 20px 15px;
  }
`