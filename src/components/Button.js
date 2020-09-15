import React, {useContext} from "react"
import {ThemeContext} from '../themeContext'
import darkTheme from '../images/dark-theme.svg'
import lightTheme from '../images/light-theme.svg'
import styled from '@emotion/styled'

function Button(props) {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
        <ThemeToggler
            onClick={toggleTheme}
            src={theme === 'light' ? darkTheme : lightTheme}
            alt="toggle theme"
        />
    )
}

export default Button

const ThemeToggler = styled.img`
    width: 50px;
`