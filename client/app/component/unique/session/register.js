import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Register extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired
    }

    handleRegister = () => {
        this.props.register(
            this.firstName.value,
            this.lastName.value,
            this.email.value,
            this.password.value
        )
    }

    render() {
        return (
            <div className="register">
                <label htmlFor="first-name">
                    First name
                    <input
                        name="first-name"
                        ref={firstName => (this.firstName = firstName)}
                        required="true"
                    />
                </label>
                <label htmlFor="last-name">
                    Last name
                    <input
                        name="last-name"
                        ref={lastName => (this.lastName = lastName)}
                        required="true"
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        ref={email => (this.email = email)}
                        required="true"
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        ref={password => (this.password = password)}
                        required="true"
                    />
                </label>
                <label htmlFor="confirm-password">
                    Confirm Password
                    <input
                        type="password"
                        name="confirm-password"
                        ref={passwordConfirmed =>
                            (this.passwordConfirmed = passwordConfirmed)}
                        required="true"
                    />
                </label>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}
