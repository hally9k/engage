import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavLink } from 'redux-first-router-link'

import UserAvatar from 'component/molecule/user-avatar'
import sessionWidget from 'style/organism/session-widget.scss'

const css = {
    ...sessionWidget
}

export default class SessionWidget extends Component {
    static propTypes = {
        currentUser: PropTypes.object,
        fetchingUser: PropTypes.func.isRequired,
        loggingOut: PropTypes.func.isRequired,
        session: PropTypes.object
    }

    componentDidMount() {
        const { fetchingUser, session: { userId } } = this.props

        fetchingUser(userId)
    }

    render() {
        const { session, currentUser } = this.props

        return (
            <div className={css['session-widget']}>
                {!session && (
                    <div>
                        <NavLink key="login" to="/login">
                            Login
                        </NavLink>
                        <NavLink key="register" to="/register">
                            Register
                        </NavLink>
                    </div>
                )}
                {session &&
                    currentUser && (
                        <div>
                            <NavLink key="profile" to="/profile">
                                <UserAvatar user={currentUser} size={'small'} />
                            </NavLink>
                            <NavLink
                                className={css.logout}
                                to="/login"
                                onClick={this.props.loggingOut}
                            >
                                Logout
                            </NavLink>
                        </div>
                    )}
            </div>
        )
    }
}
