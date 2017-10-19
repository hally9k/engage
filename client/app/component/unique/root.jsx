import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Activities from './activities.container'
import Messenger from './messenger.container'
import Login from './session/login.container'
import { NavLink } from 'redux-first-router-link'
import ErrorBoundary from 'react-error-boundary'

export default class Root extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        updateMetaState: PropTypes.func.isRequired
    }

    render() {
        const { location, updateMetaState } = this.props

        return (
            <div>
                <button
                    onClick={() =>
                        updateMetaState({
                            currentUserId: 1
                        })}
                >
                    One
                </button>
                <button
                    onClick={() =>
                        updateMetaState({
                            currentUserId: 2
                        })}
                >
                    Two
                </button>
                <section className="navigation-bar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/activities">Activities</NavLink>
                    <NavLink to="/chat">Chat</NavLink>
                </section>
                <section className="main">
                    {location.pathname === '/' && (
                        <h1 className="home-title">Home</h1>
                    )}
                    {location.pathname === '/login' && <Login />}
                    {/* {location.pathname === '/register' && <Register />} */}
                    {location.pathname === '/activities' && (
                        <Activities subjectId="1" />
                    )}
                    {location.pathname.startsWith('/chat') && (
                        <ErrorBoundary>
                            <Messenger channel={location.payload.channel} />
                        </ErrorBoundary>
                    )}
                </section>
            </div>
        )
    }
}
