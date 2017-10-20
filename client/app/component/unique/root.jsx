import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'redux-first-router-link'
import ErrorBoundary from 'react-error-boundary'

import Activities from 'component/unique/activities.container'
import Messenger from 'component/unique/messenger.container'
import Login from 'component/unique/session/login.container'
import Register from 'component/unique/session/register.container'
import Fallback from 'component/generic/fallback'

import index from '../../style/index.css'
import home from '../../style/page/home.css'
import navigationBar from '../../style/molecule/navigation-bar.css'

const css = {
    ...index,
    ...home,
    ...navigationBar
}

export default class Root extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        loggingOut: PropTypes.func.isRequired,
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
                <section className={css['navigation-bar']}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/activities">Activities</NavLink>
                    <NavLink to="/chat">Chat</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/login" onClick={this.props.loggingOut}>
                        Logout
                    </NavLink>
                </section>
                <section className={css.main}>
                    {location.pathname === '/' && (
                        <h1 className={css['home-title']}>Home</h1>
                    )}
                    {location.pathname === '/login' && <Login />}
                    {location.pathname === '/register' && <Register />}
                    {location.pathname === '/activities' && (
                        <Activities subjectId="1" />
                    )}
                    {location.pathname.startsWith('/chat') && (
                        <ErrorBoundary FallbackComponent={Fallback}>
                            <Messenger channel={location.payload.channel} />
                        </ErrorBoundary>
                    )}
                    {location.pathname === '/unauthorized' && (
                        <Fallback
                            message={'Unauthorized'}
                            link={'/'}
                            linkname={'Home'}
                        />
                    )}
                </section>
            </div>
        )
    }
}
