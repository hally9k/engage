import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Activities from './activities.container'
import Messenger from './messenger.container'
import { NavLink } from 'redux-first-router-link'

export default class Root extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    render() {
        const { location } = this.props

        return (
            <div>
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/activities">Activities</NavLink>
                <NavLink to="/chat">CHAT</NavLink>
                <NavLink to="/chat/1">Channel 1</NavLink>
                {location.pathname === '/home' && <h1>Home</h1>}
                {location.pathname === '/activities' && (
                    <Activities subjectId="1" />
                )}
                {location.pathname.startsWith('/chat') && (
                    <Messenger channel={location.payload.channel} />
                )}
            </div>
        )
    }
}
