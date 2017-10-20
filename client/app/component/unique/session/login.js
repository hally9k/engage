import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="login">
                <input
                    ref={email => (this.email = email)}
                    value="k.shrosbree@gmail.com"
                />
                <input
                    type="password"
                    ref={password => (this.password = password)}
                    value="password1"
                />
                <button
                    onClick={() =>
                        this.props.login(this.email.value, this.password.value)}
                >
                    Login
                </button>
            </div>
        )
    }
}
