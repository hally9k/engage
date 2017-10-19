import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="login">
                <input ref={username => (this.username = username)} />
                <input
                    type="password"
                    ref={password => (this.password = password)}
                />
                <button
                    onClick={() =>
                        this.props.login(
                            this.username.value,
                            this.password.value
                        )}
                >
                    Login
                </button>
            </div>
        )
    }
}
