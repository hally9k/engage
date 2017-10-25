import PropTypes from 'prop-types'
import React, { Component } from 'react'

import button from 'style/atom/button.scss'
import title from 'style/atom/title.scss'
import subTitle from 'style/atom/sub-title.scss'
import input from 'style/atom/input.scss'
import login from 'style/page/login.scss'

const css = {
    ...button,
    ...title,
    ...subTitle,
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
                <h1 className={css.title}>Engage</h1>
                <h3 className={css['sub-title']}>login</h3>
                <div className={css['login-panel']}>
                    <div className={css['input-container']}>
                        <label className={css['input-label']} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={css.input}
                            name="email"
                            ref={email => (this.email = email)}
                        />
                    </div>
                    <br />
                    <div className={css['input-container']}>
                        <label
                            className={css['input-label']}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className={css.input}
                            name="password"
                            type="password"
                            ref={password => (this.password = password)}
                        />
                    </div>
                    <br />
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
