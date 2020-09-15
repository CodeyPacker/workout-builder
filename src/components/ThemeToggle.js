import React, {useContext} from "react"
import {Context} from '../context'
import darkTheme from '../images/dark-theme.svg'
import lightTheme from '../images/light-theme.svg'
import styled from '@emotion/styled'

function ThemeToggle() {
    const {theme, toggleTheme} = useContext(Context)
    return (
        <ToggleIcon
            onClick={toggleTheme}
            src={theme === 'light' ? darkTheme : lightTheme}
            alt="toggle theme"
        />
    )
}

export default ThemeToggle

const ToggleIcon = styled.img`
    width: 40px;
`