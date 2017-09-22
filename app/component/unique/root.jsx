import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Activities from './activities.container'
import Messenger from './messenger.container'
import { NavLink } from 'redux-first-router-link'

export default class Root extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        updateMetaState: PropTypes.func.isRequired,
    }

    render() {
        const { location, updateMetaState } = this.props

        return (
            <div>
                <button
                    onClick={() =>
                        updateMetaState({
                            currentUserId: 1,
                        })}
                >
                    Hal
                </button>
                <button
                    onClick={() =>
                        updateMetaState({
                            currentUserId: 2,
                        })}
                >
                    Kir
                </button>
                <section className="navigation-bar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/activities">Activities</NavLink>
                    <NavLink to="/chat">Chat</NavLink>
                </section>
                <section className="main">
                    {location.pathname === '/' && <h1>Home</h1>}
                    {location.pathname === '/activities' && (
                        <Activities subjectId="1" />
                    )}
                    {location.pathname.startsWith('/chat') && (
                        <Messenger channel={location.payload.channel} />
                    )}
                </section>
            </div>
        )
    }
}
