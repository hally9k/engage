import PropTypes from 'prop-types'
import React, { Component } from 'react'

import button from '../../../style/atom/button.css'
import input from '../../../style/atom/input.css'
import login from '../../../style/page/login.css'

const css = {
    ...button,
    ...input,
    ...login
}

export default class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className={css.login}>
                <div className={css['login-panel']}>
                    <div>
                        <label htmlFor="email">
                            <input
                                className={css.input}
                                name="email"
                                ref={email => (this.email = email)}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                            <input
                                className={css.input}
                                name="password"
                                type="password"
                                ref={password => (this.password = password)}
                            />
                        </label>
                    </div>
                    <button
                        className={css.button}
                        onClick={() =>
                            this.props.login(
                                this.email.value,
                                this.password.value
                            )}
                    >
                        Login
                    </button>
                </div>
            </div>
        )
    }
}
