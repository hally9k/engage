import React from 'react'
import { NavLink } from 'redux-first-router-link'

import navigationBar from 'style/molecule/navigation-bar.scss'

const css = {
    ...navigationBar
}

const NavigationBar = () => (
    <div className={css['navigation-bar']}>
        <div className={css.navigation}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/chat">Chat</NavLink>
        </div>
    </div>
)

export default NavigationBar
