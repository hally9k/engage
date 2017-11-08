import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from 'react-error-boundary'

import Activities from 'component/page/activities.container'
import Messenger from 'component/page/messenger.container'
import Login from 'component/page/login.container'
import Register from 'component/page/register.container'
import Profile from 'component/page/profile.container'
import Home from 'component/page/home.container'

import Fallback from 'component/utility/fallback'
import NavigationBar from 'component/molecule/navigation-bar'
import SessionWidget from 'component/organism/session-widget.container'
import ErrorBar from 'component/organism/error-bar.container'
import SuccessBar from 'component/organism/success-bar.container'
import index from 'style/index.scss'
import home from 'style/page/home.scss'
import header from 'style/organism/header.scss'

const css = {
    ...index,
    ...home,
    ...header
}

export default class Root extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }

    render() {
        const { location } = this.props

        return (
            <div>
                <section>
                    <ErrorBar />
                    <SuccessBar />
                </section>

                <section className={css.header}>
                    <div className={css['logo-wrapper']}>
                        <h1 className={css.logo}>e</h1>
                    </div>
                    {!['/login', '/register'].includes(location.pathname) && (
                        <NavigationBar />
                    )}
                    <SessionWidget />
                </section>

                <section className={css.main}>
                    {location.pathname === '/' && <Home />}
                    {location.pathname === '/login' && <Login />}
                    {location.pathname === '/register' && <Register />}
                    {location.pathname === '/activities' && (
                        <Activities subjectId="1" />
                    )}
                    {location.pathname === '/profile' && <Profile />}
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
