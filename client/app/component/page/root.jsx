import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'redux-first-router-link'
import ErrorBoundary from 'react-error-boundary'

import Activities from 'component/page/activities.container'
import Messenger from 'component/page/messenger.container'
import Login from 'component/page/login.container'
import Register from 'component/page/register.container'
import Fallback from 'component/utility/fallback'

import index from 'style/index.scss'
import home from 'style/page/home.scss'
import navigationBar from 'style/molecule/navigation-bar.scss'

const css = {
    ...index,
    ...home,
    ...navigationBar
}

export default class Root extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        loggingOut: PropTypes.func.isRequired
    }

    render() {
        const { location } = this.props

        return (
            <div>
                {!['/login', '/register'].includes(location.pathname) && (
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
                )}
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
